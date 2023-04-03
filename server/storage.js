const aws = require('aws-sdk');
const path = require('path');
const config = require('./config');

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    region: config.S3_REGION,
    credentials: {
        accessKeyId: config.S3_ACCESS_KEY_ID,
        secretAccessKey: config.S3_SECRET_ACCESS_KEY
    },
  });

const upload = async (file, fileName) => {
    const params = {
        ACL: 'public-read',
        Body: file.buffer,
        Bucket: config.S3_BUCKET,
        Key: `uploads/${fileName}${path.extname(file.originalname)}`,
    }
    return s3.upload(params).promise().then((data) => data.Location);
};

module.exports = {upload};