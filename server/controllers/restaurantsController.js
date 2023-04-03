const Restaurant = require('../models/restaurantModel');
const Post = require('../models/postModel');
const mongoose = require('mongoose')
// get all restaurants 
const getRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find({}).sort({
        createdAt: -1
    })
    res.status(200).json(restaurants)
}

// get singular restaurant 
const getRestaurant = async (req, res) => {
    const {
        id
    } = req.params
    
    const restaurant = await Restaurant.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such restaurant'
        })
    }
    if (!restaurant) {
        return res.status(404).json({
            error: 'No such restaurant'
        })
    }
    res.status(200).json(restaurant)
}

// create new restaurant 
const createRestaurant = async (req, res) => {
    const {
        title,
        fillowers,
        location,
        description
    } = req.body
    // this adds a restaurant document to DB ! 
    try {
        const restaurant = await Restaurant.create({
            title,
            followers,
            location,
            description
        })
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}


// delete a restaurant 
const deleteRestaurant = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such restaurant'
        })
    }

    const restaurant = await Restaurant.findOneAndDelete({
        _id: id
    })
    if (!restaurant) {
        return res.status(400).json({
            error: 'No such restaurant'
        })
    }
    res.status(200).json(restaurant)
}

// update a restaurant  
const updateRestaurant = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'No such restaurant 123'
        })
    }

    const restaurant = await Restaurant.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    })

    if (!restaurant) {
        return res.status(400).json({
            error: 'No such restaurant'
        })
    }

    res.status(200).json(restaurant)
}

// GET all Posts related to a Restaurant by location
// Note: this function returns POSTS 
const getReviews = async (req, res) => {
    const {
        location
    } = req.params
    const post = await Restaurant.find({location})

    if (!mongoose.Types.ObjectId.isValid(location)) {
        return res.status(404).json({
            error: 'No such restaurant'
        })
    }
    if (!post) {
        return res.status(404).json({
            error: 'No such restaurant'
        })
    }
    res.status(200).json(restaurant)
}

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurant,
    deleteRestaurant,
    updateRestaurant, 
    getReviews
}