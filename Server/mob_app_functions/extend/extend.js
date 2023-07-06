var connection = require("../../service/connection");
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();


module.exports = async function extend(req, res) {
    const value1 = [
        req.body.bookingID
    ];
    const query1 = "UPDATE `ezpark`.`booking` SET `vehicle_removed` = '1' WHERE (`BookingID` = (?));";


    const values2 = [
        req.body.date,
        req.body.startTime,
        req.body.endTime,
        req.body.vehicleNo,
        req.body.slot,
        req.body.userName
    ];
    const query2 = "INSERT INTO `ezpark`.`booking` (`BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`, `slot`, `user_email`, `extended`) VALUES ((?), (?), (?), (?), 'online', (?), (?),'1');";


    const values3 = [
        req.body.date,
        req.body.startTime,
        req.body.endTime,
        req.body.startTime,
        req.body.endTime,
        req.body.endTime,
        req.body.slot
        ];
    const query3 = "SELECT u.MobileNo,u.Email,b.BookingID FROM ezpark.booking b LEFT JOIN ezpark.user_details u ON b.user_email=u.Email WHERE BookedDate=(?) && ((StartTime>=(?) && EndTime<=(?)) ||(StartTime>=(?) && EndTime>(?))) && !(StartTime>(?)) && slot=(?) && extended=0 && cancel=0 && vehicle_removed=0;";


    const query4 = "UPDATE `ezpark`.`booking` SET `overlapped` = '1' WHERE (`BookingID` = (?));";


    const value5 = [req.body.userName];
    const query5 = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?);";
    
    const query6 = "INSERT INTO `ezpark`.`payment_details` (`PaymentDate`, `PaymentTime`, `PaymentAmount`, `Booking_id`,`Payment_intent_id`) VALUES ((?),(?),(?),(?),(?));";


    const text1 = "Dear customer, due to the extension of the booking of a current customer your booked slot has been overlapped.  Therefore, you can change the slot or cancel your booking.We apologize for the inconvenience caused.";

    const text2 = "Dear customer, your booking extension has been successful";
    try {
        await queryAsync("START TRANSACTION");

        await queryAsync(query1, value1);

        let response = await queryAsync(query2, values2);
        const bookingID = response.insertId;

        const values6=[
            req.body.date,
            req.body.currentTime,
            req.body.paymentAmount,
            bookingID,
            req.body.paymentIntent
        ];

        await queryAsync(query6, values6);

        response = await queryAsync(query3, values3);
        if(response!=0){
            for (const element of response) {
                const bookingID = element.BookingID;
                await queryAsync(query4, [bookingID]);
                await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + element.MobileNo + "&text=" + text1);
            }
        }

        response = await queryAsync(query5, value5);
        await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + response[0].MobileNo + "&text=" + text2);
        
        await queryAsync("COMMIT");
        return res.json(200);
    } catch (err) {
        await queryAsync("ROLLBACK");
        console.log(err);
        return res.json(100);
    }
};

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