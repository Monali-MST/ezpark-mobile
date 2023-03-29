var connection = require("../../service/connection");

module.exports = async function user_reg(req, res) {
    const query = "INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`) VALUES (?);"
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
        req.body.Pword
    ]
    connection.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("User account has been  created succefully")
    })
};