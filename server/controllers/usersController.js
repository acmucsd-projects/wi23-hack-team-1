const User = require('../models/userModel');
const mongoose = require('mongoose');

const { upload } = require("../storage");

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
        profilePic,
        friends,
        email,
        password
    } = req.body
    // this adds a user document to DB ! 
    try {
        const user = await User.create({
            username,
            profilePic,
            friends,
            email,
            password
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

    const user = await User.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({
            error: 'No such user'
        })
    }
    res.status(200).json(user)
}

// router.put("/:id/picture", storage.single("image"), async function
//UPLOAD PICTURE
const uploadPicture = async (req, res) => {
    const id = req.params.id;
    const potentialUser = await User.findById(id);
    if (!potentialUser) {
        return res.status(404).json({
            error: "User does not exist",
            id
        });
    }
    const profilePicture = await upload(req.file, id);
    const user = await User.findByIdAndUpdate(
        id, {
            profilePic: profilePicture
        }, {
            new: true
        }
    );
    return res.status(200).json({
        user
    });
}


module.exports = {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    uploadPicture
}