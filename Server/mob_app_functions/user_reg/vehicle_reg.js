var connection = require("../../service/connection");

module.exports = async function vehicle_reg(req, res) {
    const query="INSERT INTO `EzPark`.`Vehicle` (`VehicleNo`, `VehicleType`,`Email`) VALUES (?);"
    const values =[
        req.body.VehicleNo,
        req.body.Type,
        req.body.Email
    ]
    connection.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Vehicel added succefully!!")
    })
}