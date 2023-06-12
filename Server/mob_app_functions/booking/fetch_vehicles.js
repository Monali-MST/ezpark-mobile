var connection = require('../../service/connection');

module.exports = async function fetch_vehicles(req,res){
    const query = 'SELECT VehicleNo FROM ezpark.vehicle WHERE Email=(?)';

    const value = [req.body.userName];
    connection.query(query, value, (err, data)=>{
        if(err) {
            return res.json("System failure");
        }else if(data != 0){
            return res.json(data);
        }else{
            return res.json("vehicles not found");
        }
    });
}