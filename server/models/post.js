const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        restaurant: {
            type: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
            // require: true
        },
        image: {
            type: String,
            require: true
        },
        review: {
            type: String,
            require: true
        },
        likes: {
            type: Number,
            require: true
        },
        rating: {
            type: Number,
            require: true
        },
        PostedBy: {
            type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            // require: true
        }
    }
)

const Post = mongoose.model('Post', PostSchema, "PostCollection");

module.exports = Post;