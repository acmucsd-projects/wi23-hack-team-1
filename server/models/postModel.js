console.log('Loading post schema...');
const User = require("./userModel")
const Restaurant = require("./restaurantModel")
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const postSchema = new Schema({
    username: {
        type: {type: mongoose.Schema.ObjectId, ref: 'User'}
    }, 
    restaurant: {
        type: {type: mongoose.Schema.ObjectId, ref: 'Restaurant'}
    },
    image: {
        type: String, 
        required: true
    }, 
    postTitle: {
        type: String, 
        required: true
    },
    review: {
        type: String, 
        required: true
    }, 
    stars: {
        type: Number, 
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Post', postSchema)
