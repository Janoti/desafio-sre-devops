"use strict";
var dbConn = require("./../../config/db.config");
//Employee object create
var User = function (user) {
  this.name = user.name;
  this.last_name = user.last_name;
  this.cpf = user.cpf;
  this.email = user.email;
  this.birthdate = user.birthdate;
};
User.create = function (newUsr, result) {
  dbConn.query("INSERT INTO users set ?", newUsr, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
User.findByCPF = function (cpf, result) {
  dbConn.query("Select * from users where cpf = ? ", cpf, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
User.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("users : ", res);
      result(null, res);
    }
  });
};
User.count = function (result) {
  dbConn.query("Select count(cpf) from users as total", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

/* User.update = function(cpf, user, result){
dbConn.query("UPDATE users SET name=?,last_name=?,cpf=?,email=?,birthdate=? WHERE cfp = ?", [user.name,user.last_name,user.cpf,user.email,user.birthdate], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
User.delete = function(cpf, result){
dbConn.query("DELETE FROM users WHERE cpf = ?", [cpf], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
}; */

module.exports = User;
