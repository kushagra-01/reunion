const express = require("express");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authentication");
const product_model = require("../models/Users.model");
const router = express.Router();






router.get("/user",authenticate, async (req,res)=>{

    try {
        const data = await product_model.find().lean().exec()
        const userDetails =[]
        data.forEach((items)=>{
            const userItemss = {
                name:items.name,
                followers:items.followers?items.followers.length : 0,
                followings:items.followings?items.followings.length : 0
            }
            userDetails.push(userItemss)
        })
        return res.status(201).send(userDetails)   
        
        
    } catch (error) {
        return res.status(500).send(error.message)
        
    }
})


router.get("/",async (req,res)=>{

    try {
        const data = await product_model.find().lean().exec()
       
        return res.status(201).send(data)   
        
        
    } catch (error) {
        return res.status(500).send(error.message)
        
    }
})

router.post("/follow/:id", async (req, res) => {
  if(req.body.userid!==req.params.id){
    try {

        const user = await product_model.findById(req.params.id);
        const CurrentUser = await product_model.findById(req.body.userid)
        if(!user.followers.includes(req.body.userid)){
            await user.updateOne({ $push: {followers: req.body.userid}});
            await CurrentUser.updateOne({ $push: {followings: req.params.id}});
            res.status(200).json("following done")
        }
        else{
            res.status(400).json("already following")
        }
    } catch (error) {
        res.status(400).json(error)
    }
  }})
  router.post("/unfollow/:id", async (req, res) => {
    if(req.body.userid!==req.params.id){
      try {
  
          const user = await product_model.findById(req.params.id);
          const CurrentUser = await product_model.findById(req.body.userid)
          if(user.followers.includes(req.body.userid)){
              await user.updateOne({ $pull: {followers: req.body.userid}});
              await CurrentUser.updateOne({ $pull: {followings: req.params.id}});
              res.status(200).json("unfollowing done")
          }
          else{
              res.status(400).json("already unfollowing")
          }
      } catch (error) {
          res.status(400).json(error)
      }
    }})

module.exports = router;
