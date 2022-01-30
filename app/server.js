const express = require("express");
const bodyParser = require("body-parser");
const date_ob = new Date();
// current date
// adjust 0 before single digit date
const date = ("0" + date_ob.getDate()).slice(-2);

// current month
const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
const year = date_ob.getFullYear();

// current hours
const hours = date_ob.getHours();

// current minutes
const minutes = date_ob.getMinutes();

// current seconds
const seconds = date_ob.getSeconds(); 
 
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
  res.send("DEVOPS/SRE - JANOTI - WELCOME ##### (Error verion) ##### - " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
});
// Require employee routes
const userRoutes = require("./src/routes/users.routes");
// using as middleware
app.use("/api/v1/users", userRoutes);
// listen for requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
