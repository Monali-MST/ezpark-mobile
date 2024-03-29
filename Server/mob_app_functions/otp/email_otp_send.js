var connection = require('../../service/connection');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

dotenv.config();

module.exports = async function email_otp_send(req, res) {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Email,
            pass: process.env.PASS,
        }
    });

    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const code = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    let parameters = {
        from: "EzPark Team",
        to: Email,
        subject: "EzPark User Verfication",
        text: "Hello " + FirstName + " " + LastName + "\n\nYour Ezpark verification code is: " + code + "\n\nBest Wishes,\nEzPark Team"
    }

    transporter.sendMail(parameters, (err) => {
        if (err) {
            return res.json(100);
        } else {
            const query = "INSERT INTO `ezpark`.`otp` (`identifier`, `otp_val`) VALUES ((?), (?));";

            const values = [Email, code];

            connection.query(query, values, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.json(100);
                } else {

                    const bookingID = data.insertId; //Get ID generted for last row

                    setTimeout(() => {
                        const deleteQuery = "DELETE FROM `ezpark`.`otp` WHERE `idnew_table` = (?);";
                        connection.query(deleteQuery, bookingID, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }, 5 * 60 * 1000);

                    return res.json(200);//Return 200 when data inserted successfully
                }
            })
        }
    })


}