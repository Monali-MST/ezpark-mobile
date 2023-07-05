var connection = require('../../service/connection');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function overlapped_change(req, res){
    const values1 = [req.body.slotID, req.body.bookingId];
    const query1 = "UPDATE `ezpark`.`booking` SET `slot` = (?), `overlapped` = '0' WHERE (`BookingID` = (?));";

    const value2 = [req.body.userName];
    const query2 = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?); ";

    const text = "Dear customer, your slot has been changed sucessfully to Slot "+req.body.slot+".";

    try{
        await queryAsync("START TRANSACTION");
        await queryAsync(query1, values1);

        const response = await queryAsync(query2, value2);

        await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + response[0].MobileNo + "&text=" + text);

        await queryAsync("COMMIT");

        return res.json(200);

    }catch (err){
        await queryAsync("ROLLBACK");
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