console.log('Loading restaurant schema...');
const mongoose = require('mongoose')

// This is a schema for making one Restaurant object. 
// Note: This is not a post or a review. Instead, it is a Restaurant object that
// is used within a post! :)


const Schema = mongoose.Schema
const restaurantSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    location: {
        // for using the Google Maps API 
        latitude: {
            type: Number, 
            required: true
        }, 
        longitude: {
            type: Number, 
            required: true
        }
    },
    description: {
        type: String, 
        required: true 
    } 
},{timestamps: true})

module.exports = mongoose.model('Restaurant', restaurantSchema)
