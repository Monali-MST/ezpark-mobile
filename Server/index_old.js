import {} from 'dotenv/config'

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


//------Connect to the Database----------
const db = mysql.createConnection({
  host: "ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "ezPark!123",
  database: "EzPark",
});

app.get("/", (req, res) => {
  res.json("Hello this is backend of EzPark");
});


//---------------------stripe CheckoutPayButton API start-----------------------
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Slot Name: Zone C -20" }]
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3000/successpay`,
      cancel_url: `http://localhost:3000/closepay`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

//---------------------stripe CheckoutPayButton API end-----------------------


//------PointSystem details Page Backend----------
app.get("/badges", (req, res) => {
  const q = "SELECT * FROM EzPark.Badge_Details;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/pointActions", (req, res) => {
    const q = "SELECT * FROM EzPark.Point_Details;";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  app.get("/discounts", (req, res) => {
    const q = "SELECT * FROM EzPark.Discounts_Details;";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  app.get("/Refund_Level", (req, res) => {
    const q = "SELECT * FROM EzPark.Refund_Level;";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
//------PointSystem user points increment functions Backend----------
// app.get("/pointsadd", (req, res) => {
//   const q = "SELECT * FROM incrememtdb.user_details;";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });


// app.put("/pointsadd:iduser_details", (req, res) => {
//   const userId = req.params.iduser_details;
//   // let x = 100;
//   // x = x + 5;
//   const q =
//     "UPDATE `incrememtdb`.`user_details` SET `noofpoints` = ? WHERE (`iduser_details` = ?);";
//   const values = [
//     req.body.addPoints,
//     req.body.currentPoints,
//   ];

//   db.query(q, [values[0]+values[1], userId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("book has been updated successfully");
//   });
// });



//------User Registration page Backend----------
app.get("/user", (req, res) => {
  const query = "SELECT * FROM User_Details";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/user", (req, res) => {
  const query =
    "INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`) VALUES (?);";
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
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User account has been  created succefully");
  });
});


//------Connect to the Backend Server----------
app.listen(8800, () => {
  console.log("Connected to backend!!");
});
