console.log('Loading users schema...');
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    friendCount: {
        type: Number, 
        required: true
    }, 
    postCount: {
        type: Number, 
        required: true
    },
    profilePic: {
        type: String,
    }
    // , 
    // friends : {
    //     type: [userSchema]
    // }
    // also need to add the users': 
        // - posts 
        // - restaurant reviews 
        // - friends
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)
