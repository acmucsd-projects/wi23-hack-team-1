const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        profilePic: {
            type: String,
            require: true
        },
        friendCount: {
            type: Number,
            require: true
        },
        postCount: {
            type: Number,
            require: true
        },
        postIDs: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
            require: true
        },
        friends: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            require: true
        }
    }
)

const User = mongoose.model('User', UserSchema, "UserCollection");

module.exports = User;