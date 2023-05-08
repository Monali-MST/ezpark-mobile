const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();



var connection = mysql.createConnection({
  host: process.env.DBHost,
  user: process.env.DBUname,
  password: process.env.DBPassword,
  database: process.env.ezpark,
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to Ezpark database")
  });

module.exports = connection