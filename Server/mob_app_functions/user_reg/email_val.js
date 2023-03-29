//Email validation when user login. Check whether entered E-mail registered one or not

var connection = require("../../service/connection");//Connect to the database

module.exports = async function email_val(req, res) {
    const query = "SELECT Email FROM EzPark.User_Details WHERE Email=(?);";
    const value=[
        req.body.Email,
    ]
    connection.query(query, [value], (err, data) => {
        if (err){
            return res.json(err);
        }else if(data==""){
            return res.json(100);
        }else{
            return res.json(200);
        }
    })
}