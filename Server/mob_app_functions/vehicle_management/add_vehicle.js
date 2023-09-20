var connection = require("../../service/connection");

module.exports = async function(req, res){
    const query = "INSERT INTO `ezpark`.`vehicle` (`VehicleNo`, `VehicleType`, `Email`) VALUES ((?), (?), (?));";
    const values = [req.body.vehicleNo, req.body.vehicleType, req.body.userName];

    connection.query(query, values, (err, data)=>{
        if(err){
            return res.json(100);
        }else{
            return res.json(200);
        }
    })
}