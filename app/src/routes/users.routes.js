const express = require('express')
const router = express.Router()
const userController =   require('../controllers/users.controller');
// Retrieve all users
router.get('/', userController.findAll);
// Create a new user
router.post('/', userController.create);
// Retrieve a single user with id
router.get('/:cpf', userController.findByCPF);



// Update a employee with id
//router.put('/:id', employeeController.update);
// Delete a employee with id
//router.delete('/:id', employeeController.delete);
module.exports = router