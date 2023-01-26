import express from "express";
import mysql from "mysql";

const app = express()

app.use(express.json())

const db=mysql.createConnection({
    host:"ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
    user:"admin",
    password:"ezPark!123",
    database:"EzPark",

})

app.get("/",(req,res)=>{
    res.json("Hello this is backend")
})

app.get("/user",(req,res)=>{
    const query="SELECT * FROM User_Details"
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/user",(req,res)=>{
    const query="INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`) VALUES (?);"
    const values=[
        req.body.FirstName,
        req.body.LastName,
        req.body.AddFLine,
        req.body.AddSLine,
        req.body.Street,
        req.body.City,
        req.body.PostCode,
        req.body.MobileNo,
        req.body.FixedLine,
        req.body.NIC,
        req.body.Email,
        req.body.Password
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User account has been  created succefully")
    })

})

app.listen(8800, ()=>{
    console.log("Connected to backend!2")
})