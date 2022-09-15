const Post = require("../models/post");
const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authentication");


router.post("/like/:id", authenticate, async(req, res) => {
    try {
        const userId = req.user.newUser._id;
     
       const postId = req.params.id;
  
       const post = await Post.findById(postId);
    //    console.log(userId.likes,post);
    //    post.map((items)=>{
    //     console.log(items)
    //    })
 
       if(!post) { return res.status(404).send("Post not found") };

       if(post.likes.includes(userId)) {
          return res.status(403).send("You already liked the post.");
       }
       await post.updateOne({$push: {likes: userId}});
       res.status(200).send(`You Liked Post with ID: ${postId}`);
    } catch (error) {
       res.status(500).json(error);
    }
 });

 router.post("/unlike/:id", authenticate, async(req, res) => {
    try {
        const userId = req.user.newUser._id;
       const postId = req.params.id;
       const post = await Post.findById(postId);
  
       if(!post) { return res.status(404).send("Post not found") };
        console.log(post, userId);
        if(!post.likes.includes(userId)) {
          return res.status(403).send("You already unliked the post.");
       }
       await post.updateOne({$pull: {likes: userId}});
       res.status(200).send(`You Unliked Post with ID: ${postId}`);
    } catch (error) {
       res.status(500).json(error);
    }
 });

 module.exports = router;
