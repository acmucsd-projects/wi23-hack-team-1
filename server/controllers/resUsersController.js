const ResUser = require('../models/resUserModel');
const mongoose = require('mongoose');
// get all restaurant user
const getResUsers = async (req, res) => {
    const resUsers = await ResUser.find({}).sort({
        createdAt: -1
    })
    res.status(200).json(resUsers)
}

// get singular restaurant user 
const getResUser = async (req, res) => {
    const {
        id
    } = req.params
    const resUser = await ResUser.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such restaurant user'
        })
    }
    if (!resUser) {
        return res.status(404).json({
            error: 'No such restaurant user'
        })
    }
    res.status(200).json(resUser)
}

// create new restaurant user 
const createResUser = async (req, res) => {
    const {
        resUsername,
        resPic, 
        followers
    } = req.body
    // this adds a restaurant user document to DB ! 
    try {
        const resUser = await ResUser.create({
            resUsername,
            resPic, 
            followers
        })
        res.status(200).json(resUser)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// delete a restaurant user 
const deleteResUser = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such restaurant user'
        })
    }

    const resUser = await ResUser.findOneAndDelete({
        _id: id
    })
    if (!resUser) {
        return res.status(400).json({
            error: 'No such restaurant user'
        })
    }
    res.status(200).json(resUser)
}

// update a restaurant user  
const updateResUser = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'No such restaurant user'
        })
    }
    
    const resUser = await ResUser.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!resUser) {
        return res.status(400).json({
            error: 'No such restaurant user'
        })
    }
    res.status(200).json(resUser)
}

// if you want to get all POSTS by RESUSERNAME, look at postsContoller.js


module.exports = {
    createResUser,
    getResUser,
    getResUsers,
    deleteResUser, 
    updateResUser
}