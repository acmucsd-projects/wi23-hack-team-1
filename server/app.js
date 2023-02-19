const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');


const usersRouter = require('./routes/user');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

dotenv.config();

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true }).then(() => {
console.log('Connected to MongoDB database');
});


module.exports = app;
