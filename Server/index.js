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

app.get ("/payment",(req, res)=>{
    const query="SELECT * FROM EzPark.Test;";
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get ("/booking1",(req, res)=>{//booking today
    //const query="SELECT * FROM EzPark.Booking;";
    const query1="SELECT COUNT(*) AS CompletedBookings FROM Booking WHERE BookedDate=date (now()) ;"
    const query2="SELECT COUNT(*) AS SevendaysBefore FROM Booking where BookedDate between adddate(now(),-7) and now();"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })   
})

app.get ("/booking1",(req, res)=>{//booking week
    const query2="SELECT COUNT(*) AS SevendaysBefore FROM Booking where BookedDate between adddate(now(),-7) and now();"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    }) 
})

//SELECT BookingID, month(BookedDate) AS Months from Booking Where month(BookedDate)=month(now());
app.get ("/booking3",(req, res)=>{//Booking Month
    const query2="SELECT COUNT(*) AS BookingsOfMonth from Booking Where month(BookedDate)=month(now());"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })   
})

//SELECT COUNT(*) AS BookingCancellationMonth from BookingCancellation Where month(CancelDate)=month(now());
app.get ("/bookingCancel3",(req, res)=>{//cancellation week
    const query2="SELECT COUNT(*) AS BookingCancellationMonth from BookingCancellation Where month(CancelDate)=month(now());"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })   
})

app.get("/bookingCancel1", (req,res)=>{//cancelation today
    //const query = "SELECT * FROM EzPark.BookingCancellation;"
    const query= "SELECT COUNT(*) AS cancellations FROM BookingCancellation WHERE CancelDate=date (now()) ;"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get ("/bookingCancel2",(req, res)=>{//cancellation week
    const query2="SELECT COUNT(*) AS SevendaysBefoereCancel FROM BookingCancellation where CancelDate between adddate(now(),-7) and now();"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })   
})


app.post("/payment",(req,res)=>{
    const query="INSERT INTO `EzPark`.`Test` (`CardNumber`, `CardHolder`, `ExpDate`) VALUES (?);"
    const values=[
        req.body.CardNum,
        req.body.CardHolder,
        req.body.Expiry,
       
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Nathali test has been created")
    })

})

app.post("/booking",(req,res)=>{
    const query="INSERT INTO `EzPark`.`Booking` (`BookingID`, `BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`) VALUES (?);"

    const values=[
        req.body.BookingID,
        req.body.BookedDate,
        req.body.StartTime,
        req.body.EndTime,
        req.body.VehicleNo,
        req.body.BookingMethod,  
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Nathali test has been created")
    })

})


app.post("/bookingCancel",(req,res)=>{
    const query="INSERT INTO `EzPark`.`BookingCancellation` (`CancellationID`, `CancelDate`) VALUES (?);"

    const values=[
        req.body.CancellationID,
        req.body.CancelDate, 
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Nathali test has been created")
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