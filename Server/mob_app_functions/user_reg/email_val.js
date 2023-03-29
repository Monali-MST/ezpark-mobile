var connection = require("../../service/connection");

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