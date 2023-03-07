console.log('Loading restaurant schema...');
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const restaurantSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    location: {
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
