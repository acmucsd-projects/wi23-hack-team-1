const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    databaseURL: process.env.databaseURL,
}

module.exports = config;