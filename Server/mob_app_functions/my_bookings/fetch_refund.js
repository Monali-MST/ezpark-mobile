var connection = require("../../service/connection");

module.exports = async function fetch_refund(req, res){
    const query1 = "SELECT Refund_percentage FROM ezpark.refund_level WHERE Refund_level_id=(?);";
    const query2 = "SELECT PaymentAmount FROM ezpark.payment_details WHERE Booking_id=(?);";

    const value1 = [req.body.refundId];
    const value2 = [req.body.bookingID];

    const returnData = [];

    try {
        const data1 = await queryAsync(query1, value1);
        returnData.push(data1[0].Refund_percentage);

        const data2 = await queryAsync(query2, value2);
        returnData.push(data2[0].PaymentAmount);

        return res.json(returnData);
    }catch(err){
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