const mongoose = require('mongoose');

const ResturantSchema = new mongoose.Schema(
    {
        posts: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
            require: true
        },
        users: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            require: true
        },
        name: {
            type: String,
            require: true
        },
        location: {
            type: (Number, Number),
            require: true
        },
        description: {
            type: String,
            require: true
        },
        tags: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        }
    }
)

const Restaurant = mongoose.model('Restaurant', ResturantSchema);

module.exports = Restaurant;