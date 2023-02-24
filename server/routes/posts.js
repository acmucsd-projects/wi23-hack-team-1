const express = require('express');
const router = express.Router();

router.post('/post', async (req, res) => {
    const { post } = req.body;
    const { restaurant, image, review, likes, rating, postedBy } = post
    if ((!restaurant || !image || !review || !postedBy || !likes || !rating)) {
        res.status(400).json({ error: 'Invalid input' });
    } else {
        const newPost = await Post.create(newPost);
        res.status(200).json({ post: newPost });
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
