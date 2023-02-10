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
            type: [String],
            require: true
        }
    }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;