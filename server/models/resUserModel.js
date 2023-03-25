console.log('Loading restaurant user schema...');
const mongoose = require('mongoose')

// This is a model for a restaurant user object, which is:
    // used by itself when displaying a restaurant's profile 

const Schema = mongoose.Schema
const resUserSchema = new Schema({
    resUsername: {
        type: String, 
        required: true
    },
    resPic: { // image 
        type: String,
    }, 
    followers : { // followers are just an array of User objects
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        
    }
},{timestamps: true})

module.exports = mongoose.model('ResUser', resUserSchema)
