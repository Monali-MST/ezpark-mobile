import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors());

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

//TEST CHART BEGINS
app.get("/Test",(req, res)=>{
    const query="SELECT * FROM EzPark.Test;";
    db.query(query, (error, results, fields) =>{
        if(error) return res.json(error)
        const rows=results.map(row => {
            const UserData={};
            fields.forEach(field =>{
                UserData[field.name] = row[field.name];
            });
            return UserData;
        });
        return  res.json(rows);
        });
});
//TEST CHART ENDS

app.get ("/date",(req, res)=>{
    const query="select date (now());";
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


//BOOKINGS AND CANCELLATIONS STARTS
//SELECT COUNT(*) AS CompletedBookings FROM Booking WHERE BookedDate=date (now()) ;
//const query="SELECT * FROM EzPark.Booking;";
app.get ("/bookingDaily",(req, res)=>{//daily dookings and cancellations
    const query1="SELECT *FROM Booking WHERE BookedDate=date (now()) ;";
    const query2= "SELECT * FROM BookingCancellation WHERE CancelDate=date (now()) ;";
    let Booking, Cancellation;
    db.query(query1, (error1, results1) => {
        if (error1) return res.json(error1);
        Booking = 0;
        results1.forEach(row1 => {
          Booking++;
        });
    
        db.query(query2, (error2, results2) => {
          if (error2) return res.json(error2);
           Cancellation = 0;
          results2.forEach(row2 => {
            Cancellation ++;
          });
          res.json({ Booking,Cancellation });
        });
      });
    });
  

//const query2="SELECT COUNT(*) AS SevendaysBefore FROM Booking where BookedDate between adddate(now(),-7) and now();"
app.get ("/bookingWeekly",(req, res)=>{//bookings and cancellation of the week
    const query1="SELECT * FROM Booking where BookedDate between adddate(now(),-7) and now();"
    const query2="SELECT * FROM BookingCancellation where CancelDate between adddate(now(),-7) and now();"
    let Booking,Cancellation;
  
    db.query(query1, (error1, results1) => {
      if (error1) return res.json(error1);
      Booking = 0;
      results1.forEach(row1 => {
        Booking++;
      });

      db.query(query2, (error2, results2) => {
        if (error2) return res.json(error2);
         Cancellation = 0;
        results2.forEach(row2 => {
          Cancellation ++;
        });
        res.json({ Booking,Cancellation });
      });
    });
  });


//SELECT BookingID, month(BookedDate) AS Months from Booking Where month(BookedDate)=month(now());
//SELECT COUNT(*) AS BookingCancellationMonth from BookingCancellation Where month(CancelDate)=month(now());
app.get("/bookingMonthly", (req, res) => {//booking and cancellation of this month
    const query1 = "SELECT * FROM Booking WHERE MONTH(BookedDate)=MONTH(now());";
    const query2 = "SELECT * FROM BookingCancellation Where month(CancelDate)=month(now());";
    let Booking,Cancellation;
  
    db.query(query1, (error1, results1, fields1) => {
      if (error1) return res.json(error1);
      Booking = 0;
      results1.forEach(row1 => {
        Booking++;
      });
    //   rows1 = results1.map(row => {
    //     const UserData1 = {};
    //     fields1.forEach(field1 => {
    //       UserData1["Booking"] = row[j];
    //     });
    //     return UserData1;
    //   });
  
      db.query(query2, (error2, results2, fields2) => {
        if (error2) return res.json(error2);
         Cancellation = 0;
        results2.forEach(row2 => {
          Cancellation ++;
        });
        // rows2 = results2.map(row => {
        //   const UserData2 = {};
        //   fields2.forEach(field2 => {
        //     UserData2["Cancellation"] = row[j];
        //   });
        //   return UserData2;
        // });
        // Return the JSON response here, inside the second db.query() callback
        res.json({ Booking,Cancellation });
      });
    });
  });
//BOOKINGS AND CANCELLATIONS ENDS

//CANCELLATIONS ONLY
  app.get("/bookingCancelDaily", (req,res)=>{//cancelation todays
    //const query = "SELECT * FROM EzPark.BookingCancellation;"
    const query= "SELECT * FROM BookingCancellation WHERE CancelDate=date (now()) ;"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        var i=0;
        data.forEach(row => {
            i++;
        })
        return res.json(i);
        
    })
})

app.get ("/bookingCancelWeekly",(req, res)=>{//cancellation week
    const query2="SELECT * FROM BookingCancellation where CancelDate between adddate(now(),-7) and now();"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        var i=0;
        data.forEach(row => {
            i++;
        })
        return res.json(i);
        
    })   
})

app.get ("/bookingCancelMonthly",(req, res)=>{//cancellation month
    const query2="SELECT * FROM BookingCancellation Where month(CancelDate)=month(now());"
    db.query(query2,(err,data)=>{
        if(err) return res.json(err)
        var i=0;
        data.forEach(row => {
            i++;
        })
        return res.json(i);
        
    })   
})
//CANCELLATIONS ONLY ENDS


//REVENUE PART BEGINS
app.get("/revenueMonthly", (req,res)=>{//MONTHLY
    const queryMR="SELECT PaymentDate,SUM(PaymentAmount) AS TotalRevenueMonthly FROM Payment_Details WHERE MONTH(PaymentDate)=MONTH(now()) GROUP BY date(PaymentDate) ORDER BY date(PaymentDate);";
    db.query(queryMR, (error, results, fields) =>{
        if(error) return res.json(error)
        const rows=results.map(row => {
            const UserData={};
            fields.forEach(field =>{
                UserData[field.name] = row[field.name];
            });
            return UserData;
        });
        return  res.json(rows);
        });
})

app.get("/revenueWeekly", (req,res)=>{//WEEKLY
    const queryW="SELECT PaymentDate, (PaymentAmount) AS TotalRevenueWeekly FROM Payment_Details WHERE PaymentDate BETWEEN date (now())-6 AND date (now())+1 GROUP BY date(PaymentDate) ORDER BY date(PaymentDate);";
    db.query(queryW, (error, results, fields) =>{
        if(error) return res.json(error)
        const rows=results.map(row => {
            const UserData={};
            fields.forEach(field =>{
                console.log(row);
                UserData[field.name] = row[field.name];
            });
            return UserData; 
        });
        return  res.json(rows);
        });
})

app.get("/revenueDaily", (req,res)=>{//DAILY
    const queryD="SELECT PaymentDate, SUM(PaymentAmount) AS TotalRevenueDaily FROM Payment_Details WHERE PaymentDate=date (now());";
    db.query(queryD, (error, results, fields) =>{
        if(error) return res.json(error)
        const rows=results.map(row => {
            const UserData={};
            fields.forEach(field =>{
                UserData[field.name] = row[field.name];
            });
            return UserData;
        });
        
        return  res.json(rows); 
        });
})
//REVENUE PART ENDS


//FULL AND PARTIAL REFUNDS BEGIN
app.get("/refundFPDaily", (req,res)=>{//DAILY
    const queryRFPD="SELECT rd.RefundDate,COALESCE(full.TotalFullRefunds, 0) AS TotalFullRefunds, COALESCE(partial.TotalPartialRefunds, 0) AS TotalPartialRefunds FROM Refund_Details rd LEFT JOIN (SELECT date(RefundDate) AS RefundDate, SUM(Refund_amount) AS TotalFullRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate=date(now()) AND Refund_percentage = 100 GROUP BY date(RefundDate)) full ON rd.RefundDate = full.RefundDate LEFT JOIN (SELECT date(RefundDate) AS RefundDate,SUM(Refund_amount) AS TotalPartialRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate=date(now()) AND Refund_percentage = 50 GROUP BY date(RefundDate)) partial ON rd.RefundDate = partial.RefundDate WHERE rd.RefundDate = date(NOW()) GROUP BY rd.RefundDate;";
    db.query(queryRFPD, (error, results, fields) =>{
        if(error) return res.json(error)
        const rows=results.map(row => {
            const UserData={};
            fields.forEach(field =>{
                UserData[field.name] = row[field.name];
            });
            return UserData;
        });
        
        return  res.json(rows); 
        });
})


     app.get("/refundFPWeekly", (req,res)=>{//WEEKLY
        const queryRFPW="SELECT rd.RefundDate,COALESCE(full.TotalFullRefunds, 0) AS TotalFullRefunds, COALESCE(partial.TotalPartialRefunds, 0) AS TotalPartialRefunds FROM Refund_Details rd LEFT JOIN (SELECT date(RefundDate) AS RefundDate, SUM(Refund_amount) AS TotalFullRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate BETWEEN date (now())-6 AND date (now()) AND Refund_percentage = 100 GROUP BY date(RefundDate)) full ON rd.RefundDate = full.RefundDate LEFT JOIN (SELECT date(RefundDate) AS RefundDate,SUM(Refund_amount) AS TotalPartialRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate BETWEEN date (now())-6 AND date (now()) AND Refund_percentage = 50 GROUP BY date(RefundDate)) partial ON rd.RefundDate = partial.RefundDate WHERE rd.RefundDate BETWEEN date (now())-6 AND date (now()) GROUP BY rd.RefundDate ORDER BY rd.RefundDate;";
        db.query(queryRFPW, (error, results, fields) =>{
            if(error) return res.json(error)
            const rows=results.map(row => {
                const UserData={};
                fields.forEach(field =>{
                    UserData[field.name] = row[field.name];
                });
                return UserData;
            });
            
            return  res.json(rows); 
            });
    })   

app.get("/refundFPMonthly", (req,res)=>{//MONTHLY
    const queryRFPM="SELECT rd.RefundDate,COALESCE(full.TotalFullRefunds, 0) AS TotalFullRefunds, COALESCE(partial.TotalPartialRefunds, 0) AS TotalPartialRefunds FROM Refund_Details rd LEFT JOIN (SELECT date(RefundDate) AS RefundDate, SUM(Refund_amount) AS TotalFullRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE MONTH(RefundDate) = MONTH(NOW()) AND Refund_percentage = 100 GROUP BY date(RefundDate)) full ON rd.RefundDate = full.RefundDate LEFT JOIN (SELECT date(RefundDate) AS RefundDate,SUM(Refund_amount) AS TotalPartialRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE MONTH(RefundDate) = MONTH(NOW()) AND Refund_percentage = 50 GROUP BY date(RefundDate)) partial ON rd.RefundDate = partial.RefundDate WHERE MONTH(rd.RefundDate) = MONTH(NOW()) GROUP BY rd.RefundDate ORDER BY rd.RefundDate;";
    db.query(queryRFPM, (error, results, fields) =>{
        if(error) return res.json(error)
        const rows=results.map(row => {
            const UserData={};
            fields.forEach(field =>{
                UserData[field.name] = row[field.name];
            });
            return UserData;
        });
        
        return  res.json(rows); 
        });
})
//FULL AND PARTIAL REFUNDS END


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

//Revenue
// SELECT PaymentDate,SUM(PaymentAmount) AS TotalRevenueMonthly
// FROM Payment_Details 
// WHERE MONTH(PaymentDate)=MONTH(now()) 
// GROUP BY date(PaymentDate);

//SELECT PaymentDate, SUM(PaymentAmount) AS TotalRevenueDaily FROM Payment_Details WHERE PaymentDate=date (now());

// SELECT PaymentDate, (PaymentAmount) AS TotalRevenueWeekly 
// FROM Payment_Details 
// WHERE PaymentDate BETWEEN adddate(now(),-7) AND now() 
// GROUP BY date(PaymentDate);



