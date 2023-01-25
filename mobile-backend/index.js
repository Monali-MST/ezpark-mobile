import express from "express";
import mysql from "mysql";

const app = express()

const db=mysql.createConnection({
    host:"ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
    user:"admin",
    passwrod:"ezPark!123",
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

app.listen(8800, ()=>{
    console.log("Connected to backend!2")
})