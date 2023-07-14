var connection = require("../../service/connection");

module.exports = async function  vehicle_manage(req, res){
    const query = "SELECT VehicleID, VehicleNo, VehicleType from ezpark.vehicle WHERE Email = (?);";

    const value = [req.body.userName];

    connection.query(query, value, (err, data)=>{
        if(err){
            return res.json(100);
        }else if(data!=0){
            return res.json(data);
        }else{
            return res.json(100);
        }
    })
}