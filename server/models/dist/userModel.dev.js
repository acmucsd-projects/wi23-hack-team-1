"use strict";

console.log('Loading users schema...');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
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
    required: true
  }
  
  // friends: {
  //   type: User // required: true

  // } // also need to add the users: 
  // // - posts 
  // - restaurant reviews 

}, {
  timestamps: true
});
module.exports = mongoose.model('User', userSchema);