var connection = require("../../service/connection");
const dotenv = require('dotenv');
const axios = require('axios');

module.exports = async function cancel_request(req, res) {
    const value1 = [req.body.bookingID];
    const query1 = "UPDATE `ezpark`.`booking` SET `cancel` = '1' WHERE (`BookingID` = (?));";

    const value2 = [req.body.Date, req.body.bookingID];
    const query2 = "INSERT INTO `ezpark`.`bookingcancellation` (`CancelDate`, `BookingID`) VALUES ((?), (?));";

    const value3 = [req.body.userName];
    const query3 = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?);";

    const value4 = [req.body.reason, req.body.Date, req.body.bookingID];
    const query4 = "INSERT INTO `ezpark`.`refund_request` (`Reason`, `Requested_date`, `Booking_id`) VALUES ((?), (?), (?));";

    const text = "Your request for the refund has been sent. (Booking ID: " + req.body.bookingID + "). You will be notified soon regarding the refund process.";

    try {

        await queryAsync("START TRANSACTION");

        await queryAsync(query1, value1);

        await queryAsync(query2, value2);

        await queryAsync(query4, value4);

        var response = await queryAsync(query3, value3);
        const to = response[0].MobileNo;

        await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + to + "&text=" + text);

        await queryAsync("COMMIT");

        return res.json(200);
    } catch (err) {
        console.log(err);

        await queryAsync("ROLLBACK");


        return res.json(100);
    }
}

// Helper function to wrap connection.query in a promise
function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}