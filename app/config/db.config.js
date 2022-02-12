'use strict';
require('dotenv').config();

const mysql = require('mysql2');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : "mysql-server", // mysql-server(KUBERNETES OU AWS) localhost (DOCKER)
  user     : process.env.MYSQL_USER, //"root"
  password : process.env.MYSQL_PASSWORD,//"root",
  database : process.env.MYSQL_DATABASE//"desafio"
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;