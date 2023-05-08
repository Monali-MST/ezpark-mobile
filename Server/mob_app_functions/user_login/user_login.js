var connection = require("../../service/connection");//Connect to the database
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function vehicle_reg(req, res) {
    const query = "SELECT `Email`, `Password` from `ezpark`.`user_details` WHERE Email=(?)"
    const values = [[req.body.userName], [req.body.password]]
    connection.query(query, [values[0]], (err, data) => {
        if (err) {
            return res.json("System failuer");
        } else if (data.length != 0) {
            if (data[0].Password == values[1]) {
                const user = { userName: data[0].Email };
                const token = jwt.sign(user, process.env.TOKEN_KEY);
                return res.json(token);
                // return res.json("Password matched");
            } else {
                return res.json(100)
            }
        } else {
            return res.json(200)
        }
    })
}