const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        password: {
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
        posts: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
            require: true
        },
        friends: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            require: true
        },
        restaurantsReviewd: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
            require: true
        }
    }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;