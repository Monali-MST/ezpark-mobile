var connection = require('../../service/connection');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports= async function success_booking(req,res){
    const query1 = "INSERT INTO `ezpark`.`booking` (`BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`, `slot`, `user_email`) VALUES ((?), (?), (?), (?), 'online',(?), (?));";

    const values1=[
        req.body.Date,
        req.body.StartTime,
        req.body.EndTime,
        req.body.VehicleNo,
        req.body.slot,
        req.body.user_email
    ];

    const query2 = "INSERT INTO `ezpark`.`payment_details` (`PaymentDate`, `PaymentTime`, `PaymentAmount`, `Booking_id`,`Payment_intent_id`) VALUES ((?),(?),(?),(?),(?));";

    const query3 = "SELECT NoOfPoints_PerHour FROM ezpark.point_details WHERE Action_ID=2;";
    const value3 = [2];

    const query4 = "UPDATE `ezpark`.`user_details` SET `UserPoints` = `UserPoints`+(?) WHERE `Email` = (?);";

    const query5 = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?);";
    const value5 = [req.body.user_email];


    try{
        await queryAsync("START TRANSACTION");

        let response = await queryAsync(query1, values1);

        const bookingID = response.insertId;

        const values2=[
            req.body.Date,
            req.body.currentTime,
            req.body.paymentAmount,
            bookingID,
            req.body.paymentIntent
        ];
        await queryAsync(query2, values2);

        response = await queryAsync(query3, value3);

        const values4 = [(Number(response[0].NoOfPoints_PerHour)/60)*Number(req.body.timeDiff), req.body.user_email];
        await queryAsync(query4, values4)

        response = await queryAsync(query5, value5);
        const to = response[0].MobileNo;

        const text = "Dear customer, Your bookinng (Booking ID: "+bookingID+") is successfull. Thank You";

        await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + to + "&text=" + text);

        await queryAsync("COMMIT");

        return res.json(200);
    }catch(err){
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