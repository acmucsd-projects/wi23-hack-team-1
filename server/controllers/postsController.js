const Post = require('../models/postModel');
const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const mongoose = require('mongoose')
const {
    upload
} = require("../storage");
// get all posts 
const getPosts = async (req, res) => {
    const post = await Post.find({}).sort({
        createdAt: -1
    })
    res.status(200).json(post)
}

// get singular post 
const getPost = async (req, res) => {
    const {
        id
    } = req.params
    const post = await Post.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such post'
        })
    }
    if (!post) {
        return res.status(404).json({
            error: 'No such post'
        })
    }
    res.status(200).json(post)
}

// create new post 
const createPost = async (req, res) => {
    const {
        username,
        restaurant,
        postTitle,
        review,
        stars, 
        image
    } = req.body
    // this adds a post document to DB ! 
    try {
        const userId = mongoose.Types.ObjectId(username);
        const restaurantId = mongoose.Types.ObjectId(restaurant);
        // Check if referenced User document exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            throw new Error('User does not exist');
        }
        
        // Check if referenced Restaurant document exists
        const restaurantExists = await Restaurant.findById(restaurantId);
        if (!restaurantExists) {
            throw new Error('Restaurant does not exist');
        }
        const post = await Post.create({
            username: userId,
            restaurant: restaurantId,
            image,
            postTitle,
            review,
            stars, 
            image
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}


// delete a post 
const deletePost = async (req, res) => {
    const {
        id
    } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such post'
        })
    }
    const post = await Post.findOneAndDelete({
        _id: id
    })
    if (!post) {
        return res.status(400).json({
            error: 'No such post'
        })
    }
    res.status(200).json(post)
}

// update a post   
const updatePost = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'No such post'
        })
    }

    const post = await Post.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    })
    if (!post) {
        return res.status(400).json({
            error: 'No such post'
        })
    }
    res.status(200).json(post)
}

// GET posts by username 
// can do a .length on this array to get the number of posts 
// by a specific user {if you want to get the post count for a user}
const getPostsByUsername = async (req, res) => {
    const {
        username
    } = req.params
    const posts = await Post.findById(username)

    if (!mongoose.Types.ObjectId.isValid(username)) {
        return res.status(404).json({
            error: 'No posts by the specified user'
        })
    }
    if (!posts) {
        return res.status(404).json({
            error: 'No posts by the specified user'
        })
    }
    res.status(200).json(posts)
}


// upload post image 
const uploadPostImage  =  async (req, res) => {
    const id = req.params.id;
    const potentialPost = await Post.findById(id);
    if (!potentialPost) {
        return res.status(404).json({
            error: "User does not exist",
            id
        });
    }
    const postImage = await upload(req.file, id);
    const post = await Post.findByIdAndUpdate(
        id, {
            image: postImage
        }, {
            new: true
        }
    );
    return res.status(200).json({
        post
    });
}



module.exports = {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost, 
    getPostsByUsername, 
    uploadPostImage
}