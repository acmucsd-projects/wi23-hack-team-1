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

router.post('/user', async (req, res) => {
  const { user } = req.body;
  const { username, profilePic, friendCount, postCount, postIDs } = user
  if ((!username || !profilePic || !friendCount || !postCount || !postIDs)) {
      res.status(400).json({ error: 'Invalid input' });
  } else {
      const newUser = await User.create(newUser);
      res.status(200).json({ user: newUser });
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
