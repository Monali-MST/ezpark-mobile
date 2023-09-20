var connection = require("../../service/connection");

module.exports = async function delete_vehicle(req, res){
    const query = "DELETE FROM `ezpark`.`vehicle` WHERE (`VehicleID` = (?));";
    const value = [req.body.vehicleID];

    connection.query(query, value, (err, data)=>{
        if(err){
            return res.json(100);
        }else{
            return res.json(200);
        }
    })
}

