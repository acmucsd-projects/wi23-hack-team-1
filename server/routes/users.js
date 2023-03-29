console.log('Loading users router...');

const express = require('express');
const {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser, 
  uploadPicture
} = require('../controllers/usersController')

const fileSizeLimitInBytes = 2 * 1024 * 1024;
const multer = require("multer");
const storage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: fileSizeLimitInBytes
    },
});

const User = require('../models/userModel');
const router = express.Router();

// GET all users 
router.get('/', getUsers);

// GET a single user 
router.get('/:id', getUser);

// POST a new user 
router.post('/', createUser);

// DELETES a user 
router.delete('/:id', deleteUser);

// UPDATES a user 
router.patch('/:id', updateUser);

// upload image 
router.put("/:id/picture", storage.single("image"), uploadPicture) 



module.exports = router;