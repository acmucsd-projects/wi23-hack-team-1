"use strict";

console.log('Loading restaurants router...');

var express = require('express');

var _require = require('../controllers/usersController'),
    getRestaurants = _require.getRestaurants,
    getRestaurant = _require.getRestaurant,
    createRestaurant = _require.createRestaurant,
    deleteRestaurant = _require.deleteRestaurant,
    updateRestaurant = _require.updateRestaurant;

var User = require('../models/restaurantModel');

var router = express.Router(); // GET all restaurants 

router.get('/', getRestaurants); // GET a single restaurnt 

router.get('/:id', getRestaurant); // POST a new restaurant 

router.post('/', createRestaurant); // DELETES a restaurant 

router["delete"]('/:id', deleteRestaurant); // UPDATES a restaurant 

router.patch('/:id', updateRestaurant);
module.exports = router;