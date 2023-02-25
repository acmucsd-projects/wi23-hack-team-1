const express = require('express');
const Restaurant = require('../models/restaurant');
const router = express.Router();

// router.post('/post', async (req, res) => {
//     const { post } = req.body;
//     const { restaurant, image, review, likes, rating, postedBy } = post
//     if ((!restaurant || !image || !review || !postedBy || !likes || !rating)) {
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

router.post('/restaurant/post', async (req, res) => {
    const { post } = req.body;
    const { posts, users, name, location, description, tags,  price} = restaurant
    if ((!restaurant || !posts || !users || !name || !location || !description || !tags || !price)) {
        res.status(400).json({ error: 'Invalid input' });
    } else {
        const newRestaurant = await Post.create(restaurant);
        res.status(200).json({ post: newRestaurant });
    }
});

// Get a single item
router.get('/restaurant/get', async (req, res) => {
    try {
      const restaurantName = req.params.restaurantName;
      const restaurant = await Restaurant.findById(restaurantName);
      if (!restaurant) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ restaurant });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/restaurant/delete', async (req, res) => {
    try {
      const restaurantName = req.params.restaurantName;
      const deletedRestaurant = await Post.findByIdAndDelete(restaurantName);
      if (!deletedRestaurant) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ post: deletedRestaurant });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
