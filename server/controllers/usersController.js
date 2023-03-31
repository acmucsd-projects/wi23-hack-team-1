const User = require('../models/userModel');
const mongoose = require('mongoose');
// get all users 
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({
        createdAt: -1
    })
    res.status(200).json(users)
}

// get singular user 
const getUser = async (req, res) => {
    const {
        id
    } = req.params
    const user = await User.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such user'
        })
    }
    if (!user) {
        return res.status(404).json({
            error: 'No such user'
        })
    }
    res.status(200).json(user)
}

// create new user 
const createUser = async (req, res) => {
    const {
        username,
        email,
        password,
        profilePic, 
        friends
    } = req.body
    // this adds a user document to DB ! 
    try {
        const user = await User.create({
            username,
            email,
            password,
            profilePic, 
            friends
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// delete a user 
const deleteUser = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such user'
        })
    }

    const user = await User.findOneAndDelete({
        _id: id
    })
    if (!user) {
        return res.status(400).json({
            error: 'No such user'
        })
    }
    res.status(200).json(user)
}

// update a user  
const updateUser = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'No such user'
        })
    }
    
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({
            error: 'No such user'
        })
    }
    res.status(200).json(user)
}

// if you want to get all POSTS by USERNAME, look at postsContoller.js


module.exports = {
    createUser,
    getUser,
    getUsers,
    deleteUser, 
    updateUser
}