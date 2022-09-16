const Post = require("../models/post");
const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authentication");

// - POST /api/like/{id} would like the post with {id} by the authenticated user.
// - POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.

router.post("/like/:id", authenticate, async (req, res) => {
    try {
        const userId = req.user.newUser._id;

        const postId = req.params.id;

        const post = await Post.findById(postId);


        if (!post) {
            return res.status(404).send("Post not found")
        };

        if (post.likes.includes(userId)) {
            return res.status(403).send("You already liked the post.");
        }
        await post.updateOne({
            $push: {
                likes: userId
            }
        });
        res.status(200).send(`You Liked Post with ID: ${postId}`);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/unlike/:id", authenticate, async (req, res) => {
    try {
        const userId = req.user.newUser._id;
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send("Post not found")
        };

        if (!post.likes.includes(userId)) {
            return res.status(403).send("You already unliked the post.");
        }
        await post.updateOne({
            $pull: {
                likes: userId
            }
        });
        res.status(200).send(`You Unliked Post with ID: ${postId}`);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;