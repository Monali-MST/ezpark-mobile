var connection = require("../../service/connection");

module.exports = async function point(req, res){

    const query1 = "SELECT UserPoints,Badge FROM ezpark.user_details WHERE Email=(?);";

    const query2 = "SELECT Minimum_Points FROM ezpark.badge_details;";

    const value = [req.body.userName];

    const returnData = [];
    try{
        let response = await queryAsync(query1, value);
        response.forEach(element=> {
            returnData.push(element);
        });

        response = await queryAsync(query2);

        response.forEach(element => {
            returnData.push(element);
        });
     
        return res.json(returnData);

    }catch(err){
        console.log(err);
        return res.json(100);
    }
}

// Helper function to wrap connection.query in a promise
function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}