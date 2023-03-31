console.log('Loading post schema...');
const User = require("./userModel")
const Restaurant = require("./restaurantModel")

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const postSchema = new Schema({
    username: { // who posted it
        type: {type: mongoose.Schema.ObjectId, ref: 'User'}
    }, 
    restaurant: { // where did they eat
        type: {type: mongoose.Schema.ObjectId, ref: 'Restaurant'}
    }, 
    postTitle: { // title of the post (like reddit lol)
        type: String, 
        required: true
    },
    review: { // they can write a review!
        type: String, 
        required: true
    }, 
    stars: { // star rating from 0 to 5 
        type: Number, 
        required: true,
        validate: {
            validator: function(v) {
                return v > 0 && v <= 5;
            },
            message: 'Stars must be between 0 and 5'
        }
    }, 
    image: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('Post', postSchema)
