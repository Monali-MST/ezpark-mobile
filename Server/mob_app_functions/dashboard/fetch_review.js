var connection = require("../../service/connection");

module.exports = async function fetch_review(req, res){
   const query = "SELECT DISTINCT b.user_email, r.Review, r.Rate, u.FirstName, u.LastName, r.ReviewRateID FROM ezpark.review_rate r JOIN ezpark.booking b ON r.booking_id=b.BookingID JOIN ezpark.user_details u ON b.user_email=u.Email WHERE r.Review!='' ORDER BY r.ReviewRateID DESC LIMIT 10;";

   connection.query(query, (err, data)=>{
        if(err){
            console.log(err);
            return res.json(100);
        }else if(data!=0){
            return res.json(data);
        }else{
            return res.json(404);
        }
   })
}