var connection = require("../../service/connection");

module.exports = async function change_password(req, res){
    const query = "UPDATE `ezpark`.`user_details` SET `Password` = (?) WHERE `Email` = (?);";

    const values = [
        req.body.Password,
        req.body.Email
    ]

    connection.query(query, values, (err, data)=>{
        if(err){
            console.log(err);
            return res.json(100);
        }else{
            return res.json(200);
        }
    })
}