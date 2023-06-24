var connection = require("../../service/connection");
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function cancel_refund(req, res) {
  const value1 = [req.body.bookingID];
  const query1 = "UPDATE `ezpark`.`booking` SET `cancel` = '1' WHERE (`BookingID` = (?));";

  const value2 = [req.body.Date, req.body.bookingID];
  const query2 = "INSERT INTO `ezpark`.`bookingcancellation` (`CancelDate`, `BookingID`) VALUES ((?), (?));";


  const value3 = [req.body.refundAmount, req.body.levelId, req.body.Date, req.body.bookingID]
  const query3 = "INSERT INTO `ezpark`.`refund_details` (`Refund_amount`, `Refund_level_id`, `RefundDate`, `Booking_id`) VALUES ((?), (?), (?), (?));"

  const value4 = [req.body.userName];
  const query4 = "SELECT MobileNo FROM ezpark.user_details WHERE Email=(?);";

  const text = "Dear customer, Your refund for the booking ID "+req.body.bookingID+" is being processed. It will take 1 or 2 days to complete the refund process.";

  try {
    await queryAsync(query1, value1);

    await queryAsync(query2, value2);

    await queryAsync(query3, value3);

    const response = await queryAsync(query4, value4);
    const to = response[0].MobileNo;

    await axios.post(process.env.SMS_URL + "?sendsms&apikey=" + process.env.SMS_Key + "&apitoken=" + process.env.SMS_Token + "&type=sms&from=EzPark&to=" + to + "&text=" + text)

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