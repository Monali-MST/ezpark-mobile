var connection = require("../../service/connection");

module.exports = async function slotPrice(req, res){

    const query = "SELECT slot_price FROM ezpark.slot WHERE slot_id=(?);";
    
    const value = [req.body.slotId];

    connection.query(query, value, (err ,data)=>{
        if(err){
            return res.json(100);
        }else if(data!=0){
            return res.json(data[0].slot_price);
        }else{
            return res.json(404);
        }
    })
}