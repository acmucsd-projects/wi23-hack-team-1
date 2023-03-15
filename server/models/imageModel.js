console.log('Loading image schema...');

const mongoose = require('mongoose')



const Schema = mongoose.Schema
const imageSchema = new Schema({
   image: {
    type: String 
   }
},{timestamps: true})

module.exports = mongoose.model('Image', imageSchema)




