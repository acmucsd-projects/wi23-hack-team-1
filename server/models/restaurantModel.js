console.log('Loading restaurant schema...');
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const restaurantSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    location: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true 
    }
},{timestamps: true})

module.exports = mongoose.model('Restaurant', restaurantSchema)
