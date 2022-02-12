
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// define a root route

const version = 1

app.get("/", (req, res) => {
  res.send("DEVOPS/SRE - JANOTI - WELCOME 1 Version - " + version);
});
// Require employee routes
const userRoutes = require("./src/routes/users.routes");
// using as middleware
app.use("/api/v1/users", userRoutes);
// listen for requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
