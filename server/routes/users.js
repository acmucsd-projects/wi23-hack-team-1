console.log('Loading users router...');

const express = require('express');
const {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser
} = require('../controllers/usersController')

const User = require('../models/userModel');
const router = express.Router();

// GET all users 
router.get('/', getUsers);

// GET a single user 
router.get('/:id', getUser);

// POST a new user 
router.post('/', createUser);

// DELETES a user 
router.delete('/:id', deleteUser);

// UPDATES a user 
router.patch('/:id', updateUser);


module.exports = router;