const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {

   const token = req.headers.token;
   if(token){
       jwt.verify(req.headers.token, "HashEnv" , (err,user)=>{
           if(err){
               return res.status(500).send("Token is not valid")
           }
           req.token = token;
           req.user = user;
           next();
       }) 
   }
   else{
       return res.status(500).send("Please enter a token");
   }

}
module.exports = authenticate