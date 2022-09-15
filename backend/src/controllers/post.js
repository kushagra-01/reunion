const User = require("../models/Users.model");
const Post = require("../models/post");
const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authentication");

router.post("/post",authenticate, async (req, res) => {
    const newPost = new Post({userid: req.user.newUser, title: req.body.title, desc: req.body.desc});

    const userId = req.user.newUser;
    try {
       const user = await User.findById(userId);
       const post = await newPost.save();
    
       await user.updateOne({$push: {posts: {Post_Id: post._id, Created_Time: post.createdAt}}});
       const obj = {
          "POST-ID": post._id,
          "Title": post.title,
          "Description": post.desc,
          "Created Time(UTC)": post.createdAt
       };
   
       res.status(200).send(obj);
    } catch (error) {
       res.status(500).json(error);
    }
 });

 
// - DELETE api/posts/{id} would delete post with {id} created by the authenticated user.

router.delete("/post/:id", async(req, res) => {
   try {
      const postId = req.params.id;
   
      const post = await Post.findById(postId);

      if(!post) { return res.status(403).send("Post not found") };
      await Post.deleteOne({_id: postId});
      res.status(200).send(`post with ${postId} deleted successfully`);
   } catch (error) {
      res.status(500).json(error);
   }
});


router.get("/post",async (req,res)=>{

   try {
       const data = await Post.find().lean().exec()
      
       return res.status(201).send(data)   
       
       
   } catch (error) {
       return res.status(500).send(error.message)
       
   }
})

 module.exports = router;
