const express = require('express');
const router = express.Router();

// Post operation
router.post('/post/post', async (req, res) => {
    const { post } = req.body;
    const { restaurant, image, review, likes, rating, postedBy } = post
    if ((!restaurant || !image || !review || !postedBy || !likes || !rating)) {
        res.status(400).json({ error: 'Invalid input' });
    } else {
        const newPost = await Post.create(newPost);
        res.status(200).json({ post: newPost });
    }
});

// Get a single item
router.get('/post/get', async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ post });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/post/delete', async (req, res) => {
    try {
      const postId = req.params.postId;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ post: deletedPost });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

// router.post('/post', async (req, res) => {
//     const { post } = req.body;
//     const {image, review, likes, rating } = post
//     if ((!image || !review || !likes || !rating)) {
//         res.status(400).json({ error: 'Invalid input' });
//     } else {
//         const newPost = await Post.create(newPost);
//         res.status(200).json({ post: newPost });
//     }
// });

// const newPost = {
//     restaurant: null,
//     image: "help",
//     review: "bad",
//     likes: 12,
//     rating: 2,
//     postedBy: null
// };
// Post.create(newPost);


// /* GET posts listing. */
// router.get('/', function(req, res, next) {
//   const user = {
//     name: 'ACM Hack',
//     email: 'hack@acmucsd.org'
//   }
//   res.status(200).json({ user });
// });

module.exports = router;
