var connection = require('../../service/connection');

module.exports = async function fetch_discounts(req, res){
    const query="SELECT Discount from ezpark.discounts_details WHERE BadgeId=(SELECT Badge FROM ezpark.user_details WHERE Email=(?));";
    const value = [req.body.userName];

    connection.query(query, value, (err, data)=>{
        if(err){
            return res.json("System failure");
        }else{
            return res.json(data);
        }
    })
}