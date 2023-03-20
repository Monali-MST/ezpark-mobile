import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import MySQLStore from "express-mysql-session";

const app = express();
app.use(express.json());
app.use(cors());

var options = {
    host: "ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    port: 3306,
    password: "ezPark!123",
    database: "EzPark"
}
var connection = mysql.createConnection(options);
var sessionStore = new MySQLStore({}, connection);

const db = mysql.createConnection(options);

app.use(session({
    secret: "This going be a secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.get("/", (req, res) => {
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.json("Hello this is backend")
})

app.get("/user", (req, res) => {
    const query = "SELECT * FROM User_Details"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/user", (req, res) => {
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
    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("User account has been  created succefully")
    })

})

app.post("/vehicle", (req,res) => {
    const query="INSERT INTO `EzPark`.`Vehicle` (`VehicleNo`, `VehicleType`,`Email`) VALUES (?);"
    const values =[
        req.body.VehicleNo,
        req.body.Type,
        req.body.Email
    ]
    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Vehicel added succefully!!")
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})