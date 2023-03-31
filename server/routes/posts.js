console.log('Loading posts router...');

const express = require('express');
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsByUsername, 
  uploadPostImage
} = require('../controllers/postsController')

const fileSizeLimitInBytes = 2 * 1024 * 1024;
const multer = require("multer");
const storage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: fileSizeLimitInBytes
    },
});


const Post = require('../models/postModel');
const router = express.Router();

// GET all posts 
router.get('/', getPosts);

// GETs all posts by users 
router.get('/', getPostsByUsername);

// GET a single post 
router.get('/:id', getPost);

// POST a new post 
router.post('/', createPost);

// DELETES a post 
router.delete('/:id', deletePost);

// UPDATES a post 
router.patch('/:id', updatePost);

// upload image 
router.put("/:id/image", storage.single("image"), uploadPostImage) 


module.exports = router;