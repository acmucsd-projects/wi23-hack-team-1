console.log('Mounting routes...'); // checks if the server starts correctly
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// import all routers
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const restaurantsRouter = require('./routes/restaurants');
//const imagesRouter = require('./routes/images');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());

// checks if the request has a body and attaches it to the 
// request object
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

dotenv.config();

// db connection 
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// middleware
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/restaurants', restaurantsRouter);

module.exports = app;