var connection = require("../../service/connection");
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function cancel_refund(req, res) {
  console.log(req.body.timeDiff);

  const value1 = [req.body.bookingID];
  const query1 = "UPDATE `ezpark`.`booking` SET `cancel` = '1' WHERE (`BookingID` = (?));";

  const value2 = [req.body.Date, req.body.bookingID];
  const query2 = "INSERT INTO `ezpark`.`bookingcancellation` (`CancelDate`, `BookingID`) VALUES ((?), (?));";


  const value3 = [req.body.refundAmount, req.body.levelId, req.body.Date, req.body.bookingID]
  const query3 = "INSERT INTO `ezpark`.`refund_details` (`Refund_amount`, `Refund_level_id`, `RefundDate`, `Booking_id`) VALUES ((?), (?), (?), (?));"

  const value4 = [req.body.userName];
  const query4 = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?);";

  const value5 = [req.body.timeDiff];
  const query5 = "SELECT NoOfPoints_PerHour FROM ezpark.point_details WHERE UserAction='Book Cancelation Hour';";

  const query6 = "UPDATE `ezpark`.`user_details` SET `UserPoints` = `UserPoints`+(?) WHERE `Email` = (?);";

  const text = "Dear customer, Your refund for the booking ID "+req.body.bookingID+" is being processed. It will take 1 or 2 days to complete the refund process.";

  try {

    await queryAsync("START TRANSACTION");

    await queryAsync(query1, value1);

    await queryAsync(query2, value2);

    await queryAsync(query3, value3);

    var response = await queryAsync(query4, value4);
    const to = response[0].MobileNo;

    response = await queryAsync(query5);
    const point = [Number((((response[0].NoOfPoints_PerHour)/60)*value5[0]).toFixed(0)), req.body.userName];

    await queryAsync(query6, point);


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