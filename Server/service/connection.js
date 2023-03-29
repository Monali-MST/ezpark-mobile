var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "ezPark!123",
  database: "EzPark",
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to Ezpark database")
  });

module.exports = connection