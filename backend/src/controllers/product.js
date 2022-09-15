const express = require("express");
const jwt = require("jsonwebtoken");
const product_model = require("../models/Users.model");
const router = express.Router();



const verrifytoken = (req, res, next) => {

    const token = req.headers.token;
    if(token){
        jwt.verify(req.headers.token, "HashEnv" , (err,user)=>{
            if(err){
                return res.status(500).send("Token is not valid")
            }
            req.user = user;
            next();
        }) 
    }
    else{
        return res.status(500).send("Please enter a token");
    }

}

router.get("",async (req,res)=>{

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

module.exports = router;
