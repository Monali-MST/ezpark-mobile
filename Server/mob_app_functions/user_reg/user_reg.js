//Pass user registration details to the databse(User_details table)

var connection = require("../../service/connection"); // Connect to the database

module.exports = async function user_reg(req, res) {
  try {
    const query1 = "SELECT NoOfPoints_PerHour FROM ezpark.point_details WHERE Action_ID=1;";
    const query2 = "INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`,`UserPoints`) VALUES (?);";

    // Execute query1 to get the NoOfPoints_PerHour value
    const data = await executeQuery(query1);
    const points = data[0].NoOfPoints_PerHour;

    const values = [
      req.body.Fname,
      req.body.Lname,
      req.body.AddFLine,
      req.body.AddSLine,
      req.body.Street,
      req.body.City,
      req.body.PCode,
      req.body.MobNum,
      req.body.FixedNum,
      req.body.Nic,
      req.body.Email,
      req.body.Pword,
      points,
    ];

    // Execute query2 to insert user details
    await executeQuery(query2, [values]);

    return res.json("User account has been created successfully");
  } catch (error) {
    return res.json(error);
  }
};

// Function to execute a database query
function executeQuery(query, values) {
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
