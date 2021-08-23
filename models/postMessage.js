const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    name: String,
    dob: Date,
    // age: Number,
    gender: String,
    // job: String,
    caste: String,
    // subcaste:String,
    // place:String,
    // height:Number,
    // weight:Number,
    pic:String
})

var PostMessage = mongoose.model('PostMessage', postSchema);
module.exports = { PostMessage }