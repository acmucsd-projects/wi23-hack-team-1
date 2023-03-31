const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  S3_REGION: process.env.AWS_BUCKET_REGION,
  S3_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.AWS_ACCESS_KEY_SECRET,
  S3_BUCKET: process.env.S3_BUCKET,
};

module.exports = config;