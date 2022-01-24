'use strict';
const User = require('../models/users.model');


exports.findAll = function(req, res) {
User.findAll(function(err, user) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', user);
  res.send(user);
});
};

exports.create = function(req, res) {
const new_user = new User(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
User.create(new_user, function(err, user) {
  if (err)
  res.send(err);
  res.json({error:false,message:"User added successfully!",data:user});
});
}
};

exports.findByCPF = function(req, res) {
User.findByCPF(req.params.cpf, function(err, user) {
  if (err)
  res.send(err);
  res.json(user);
});
};

exports.count = function(res) {
User.count(function(err, user) {
  console.log('Counter');
  if (err)
  res.json(user);
  console.log('Counter', user);
});
};
  