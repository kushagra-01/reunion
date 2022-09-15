const User = require("../models/Users.model");
const Post = require("../models/post");
const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authentication");

router.post("/post",authenticate, async (req, res) => {
    const newPost = new Post({userid: req.user.newUser, title: req.body.title, desc: req.body.desc});
    console.log(newPost,"dd",req.user.newUser._id);
    const userId = req.user.newUser;
    try {
       const user = await User.findById(userId);
       const post = await newPost.save();
      //  console.log(post);
       await user.updateOne({$push: {posts: {Post_Id: post._id, Created_Time: post.createdAt}}});
       const obj = {
          "POST-ID": post._id,
          "Title": post.title,
          "Description": post.desc,
          "Created Time(UTC)": post.createdAt
       };
       console.log(obj,"rf");
       res.status(200).send(obj);
    } catch (error) {
       res.status(500).json(error);
    }
 });

 module.exports = router;
