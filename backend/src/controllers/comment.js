const router = require('express').Router();
const Post = require("../models/post");
const authenticate = require("../middleware/authentication");


router.post("/comment/:id",authenticate, async(req, res) => {
   try {
      const userId = req.user.newUser._id;;
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if(!post) {
         return res.status(404).send("Post not found");
      }
      await post.updateOne({$push: {comments: {userid: userId, comment: req.body.Comment}}});
      const updatedPost = await Post.findById(postId);
      const commentArray = updatedPost.comments;
      res.status(200).send({"Comment-ID":  commentArray[commentArray.length - 1]._id});
   } catch (error) {
      res.status(500).json(error);
   }
});

module.exports = router;