const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   const user = {
//     name: 'ACM Hack',
//     email: 'hack@acmucsd.org'
//   }
//   res.status(200).json({ user });
// });

router.post('/user/post', async (req, res) => {
  const { user } = req.body;
  const { username, profilePic, friendCount, postCount, postIDs } = user
  if ((!username || !profilePic || !friendCount || !postCount || !postIDs)) {
      res.status(400).json({ error: 'Invalid input' });
  } else {
      //const newUser = await User.create(newUser);
      const newUser = await User.create(user);
      res.status(200).json({ user: newUser });
  }
});

// Get a single item
router.get('/user/get', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await Post.findById(username);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete', async (req, res) => {
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


const newUser = {
  username: "testUsername",
  profilePic: "help",
  friendCount: 12,
  postCount: 14,
  postIDs: null
};
User.create(newUser);




module.exports = router;
