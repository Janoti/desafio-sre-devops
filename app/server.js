const express = require("express");
const bodyParser = require("body-parser");
const date_ob = Date.now();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds(); 
 
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// define a root route
app.get("/", (req, res) => {
  res.send("DEVOPS/SRE - JANOTI - WELCOME - " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
});
// Require employee routes
const userRoutes = require("./src/routes/users.routes");
// using as middleware
app.use("/api/v1/users", userRoutes);
// listen for requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
