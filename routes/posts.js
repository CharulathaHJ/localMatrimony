// import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
const express = require('express');
const mongoose = require('mongoose');
// const PostMessage = require('../models/postMessage.js');
const router = express.Router();

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

let PostMessage = mongoose.model('PostMessage', postSchema);

// router.get('/', (req,res)=>{
//     res.send([]);
// });

router.get('/', async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.post('/',  async (req, res) => {
    const { name, dob, gender, caste, pic } = req.body;

    const newPostMessage = new PostMessage({ name, dob, gender, caste, pic })
debugger
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
router.get('/:id', async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, dob, gender, caste, pic } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { name, dob, gender, caste, pic, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
});
router.patch('/:id/likePost', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
});
module.exports = router;

