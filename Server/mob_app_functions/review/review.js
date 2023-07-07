var connection = require("../../service/connection");

module.exports = async function review(req,res){
    const query1 = "INSERT INTO `ezpark`.`review_rate` (`Review`, `Rate`, `booking_id`) VALUES ((?), (?), (?));";
    const values1 = [req.body.review, req.body.rate, req.body.bookingId];

    const query2 = "SELECT NoOfPoints_PerHour FROM ezpark.point_details WHERE Action_ID=(?);";

    const query3 = "UPDATE `ezpark`.`user_details` SET `UserPoints` = `UserPoints`+(?) WHERE `Email` = (?);";

    try{
        await queryAsync("START TRANSACTION");
        
        await queryAsync(query1, values1);

        let response = await queryAsync(query2, [4]);

        let points = Number(response[0].NoOfPoints_PerHour);

        if(req.body.review!=""){
            response = await queryAsync(query2, [4]);
            points += Number(response[0].NoOfPoints_PerHour);
        }

        const values3 = [points, req.body.userName];
        await queryAsync(query3, values3);

        await queryAsync("COMMIT");
        
        response = [200, points]
        return res.json(response);
    }catch(err){
       await queryAsync("ROLLBACK")
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