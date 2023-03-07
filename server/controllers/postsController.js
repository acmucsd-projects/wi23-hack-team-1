const Post = require('../models/postModel');

const mongoose = require('mongoose')
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
        image,
        postTitle,
        review,
        stars
    } = req.body
    // this adds a post document to DB ! 
    try {
        const post = await Post.create({
            username,
            restaurant,
            image,
            postTitle,
            review,
            stars
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

module.exports = {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
}