var connection = require('../../service/connection')
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function mobile_resend(req, res) {
    function generateRandomNumber() {
        // Generate a random number between 1000 and 9999
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const to = req.body.MobNo;
    const text = "Your EzPark verification code: ";
    const code = generateRandomNumber();
    console.log(code);
    await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + to + "&text=" + text + code + "")

    const query = "UPDATE `ezpark`.`otp` SET `otp_val` = (?) WHERE (`identifier` = (?));";

    const values = [code, to];

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