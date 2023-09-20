var connection = require("../../service/connection");
const dotenv = require('dotenv');
const axios = require('axios');

module.exports = async function before_five(req, res){
    const text = "Dear customer, your booking time (for Booking ID: "+req.body.bookingID+") will end within 5 minutes, if you need to extend the duration you can do so via the app.";

    const value = [req.body.userName];
    const query = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?);";

    try {

        var response = await queryAsync(query, value);
        const to = response[0].MobileNo;

        await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + to + "&text=" + text);

        return res.json(200);

    } catch (err) {
        console.log(err);
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