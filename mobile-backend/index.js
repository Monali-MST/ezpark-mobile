import express from "express";
import mysql from "mysql";

const app = express()

app.use(express.json())

const db=mysql.createConnection({
    host:"ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
    user:"admin",
    password:"ezPark!123",
    database:"EzPark"

})

app.get("/",(req,res)=>{
    res.json("Hello this is backend1")
})

app.get("/user",(req,res)=>{
    const query="SELECT * FROM User_Details"
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/user",(req,res)=>{
    const query="INSERT INTO `EzPark`.`User_Details` (`UserID`, `Firstname`, `Lastname`, `Email`, `UserPassword`, `Contact`) VALUES (?);"
    const values=[
        req.body.UserID,
        req.body.Firstname,
        req.body.Lastname,
        req.body.Email,
        req.body.UserPassword,
        req.body.Contact,
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User account has been  created succefully")
    })

})

app.listen(8800, ()=>{
    console.log("Connected to backend!2")
})