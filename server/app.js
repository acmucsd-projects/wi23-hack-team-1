const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');


const Post = require('./models/post');
// const Restaurant = require('./models/restaurant');
// const User = require('./models/user');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/restuarants', userRestaurant);
// app.use('/users', usersRouter);
app.use('/posts', postsRouter);

dotenv.config();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");
     
    var obj = new Post({ 
      restaurant: null,
      image: "testing w null",
      review: "TESTINGGGG222",
      likes: 1,
      rating: 2, 
      postedBy: null,   
    });
 
    // save model to database
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      console.log(obj.likes + " saved to bookstore collection.");
    });

   
});






// DB_URL = process.env.DB_URL + "/WI23Projects"

// mongoose.connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true }).then(() => {
//     console.log('Connected to MongoDB database');
    
//     var db = mongoose.connection;

//     db.on('error', console.error.bind(console, 'connection error:'));
    
//     // var myobjct = mongoose.model('Post', PostSchema, 'Test');
//     var myobjct = new Post({
//         image: "help",
//         review: "bad",
//         likes: 12,
//         rating: 2,
//     });

//     db.collection("Test").insertOne(myobjct, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
// });

module.exports = app;
