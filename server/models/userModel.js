console.log('Loading users schema...');
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    postCount: {
        type: Number, 
        required: true
    },
    profilePic: {
        type: String,
    }, 
    friends : {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)
