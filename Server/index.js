var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const dotenv = require("dotenv");
var app = express();

const mob_app_functions = require("./routes/mob_app_route");

dotenv.config();
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mob_app_functions);

//Listening to frontend
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Start server using environment variables
app.listen(process.env.PORT, () => {
  console.log("server started in port : ", process.env.PORT);
});
