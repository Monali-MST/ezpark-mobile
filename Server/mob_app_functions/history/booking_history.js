var connection = require('../../service/connection');

module.exports = async function booking_history(req,res){
    const query="SELECT * FROM ezpark.booking WHERE ((BookedDate<(?))||(BookedDate=(?)&&EndTime<(?)))&&user_email=(?);";

    const values = [req.body.Date, req.body.Date, req.body.Time, req.body.UserName];

    connection.query(query, values, (err, data)=>{
        if(err){
            return res.json(err);
        }else {
            if(data != 0){
                return res.json(data);
            }else{
                return res.json(404);
            }
        } 
    })
}