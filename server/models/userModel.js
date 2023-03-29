console.log('Loading users schema...');
const mongoose = require('mongoose')

// This is a model for a user object, which is:
    // used by itself when displaying someone's profile 
    // used inside a post, to show who posted the post 

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    profilePic: { // image 
        type: String,
    }, 
    friends : { // friends are just an array of User objects
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        
    },
    email : {
        type: String, 
        required: true
    }, 
    password : {
        type: String, 
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)
