console.log('Loading restaurants router...');

const express = require('express');
const {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant
} = require('../controllers/restaurantsController')

const Restaurant = require('../models/restaurantModel');
const router = express.Router();

// GET all restaurants 
router.get('/', getRestaurants);

// GET a single restaurants 
router.get('/:id', getRestaurant);

// POST a new restaurants 
router.post('/', createRestaurant);

// DELETES a restaurants 
router.delete('/:id', deleteRestaurant);

// UPDATES a restaurants 
router.patch('/:id', updateRestaurant);


module.exports = router;