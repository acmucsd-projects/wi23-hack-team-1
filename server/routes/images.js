console.log('Loading images router...');

const express = require('express');
const multer = require('multer');
const Image = require('../models/imageModel');
const dotenv = require('dotenv');
//const multer = require('multer');
const Aws = require('aws-sdk');
const router = express.Router();
console.log("hello")
dotenv.config();
// the storage variable
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }
})

// verify the TYPE of the upload 
const filefilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        console.log("check!!!")
        cb(null, true)
    } else {
        console.log("check@@!!!")
        cb(null, false)
    }
}
// upload variable 
const upload = multer({
    storage: storage,
    fileFilter: filefilter
});


const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET // secretAccessKey is also store in .env file
})


const uploadImage = async (req, res) => {
    console.log("helllooooooooooooooooo")

    console.log(req.file) // to check the data in the console that is being uploaded

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        //ACL: "public-read-write",
        //ContentType: "image/jpeg"
    };
    console.log(params.Key)

    // -----------------------------------------//
    //s3.upload(params).promise();

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send({
                    "err": error
                }) // if we get any error while uploading error message will be returned.
            }

       // If not then below code will be executed

        console.log(data) // this will give the information about the object in which photo is stored 

       // saving the information in the database.   
        const img = new Image({
            image: data.Bucket
        });
        img.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    image: data.Location,
                })
            })
            .catch(err => {
                res.send({
                    message: err
                })
            })
    })

}


// POST a new image 
router.post('/', upload.single('uploaded_file'), uploadImage);

module.exports = router;