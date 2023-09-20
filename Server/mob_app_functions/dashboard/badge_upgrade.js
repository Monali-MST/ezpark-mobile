var connection = require("../../service/connection");

module.exports = async function(req, res){

    const query = "UPDATE `ezpark`.`user_details` SET `Badge` = (?) WHERE `Email` = (?);";

    const values=[req.body.badge, req.body.userName];

    connection.query(query,values, (err, data)=>{
        if(err){
            console.log(err);
            return res.json(100);
        }else{
            return res.json(200);
        }
    })
}