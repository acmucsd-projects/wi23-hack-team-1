console.log('Loading posts router...');

const express = require('express');
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsByUsername
} = require('../controllers/postsController')

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



module.exports = router;