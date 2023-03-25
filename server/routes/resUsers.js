console.log('Loading restaurant users router...');

const express = require('express');
const {
  createResUser,
  getResUser,
  getResUsers,
  deleteResUser,
  updateResUser
} = require('../controllers/resUsersController')

const ResUser = require('../models/resUserModel');
const router = express.Router();

// GET all restaurant users 
router.get('/', getResUsers);

// GET a single restaurant user 
router.get('/:id', getResUser);

// POST a new restaurant user 
router.post('/', createResUser);

// DELETES a restaurant user 
router.delete('/:id', deleteResUser);

// UPDATES a restaurant user 
router.patch('/:id', updateResUser);


module.exports = router;