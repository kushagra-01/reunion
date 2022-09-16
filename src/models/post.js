const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   userid : String,
   title: {
      type: String,
      required: true
   },
   desc: {
      type: String
   },
   comments: [{
      userid: String,
      comment: {
         type: String,

      }
   }],
   likes: {
      type: Array,
      default: []
   }
}, {timestamps: true});

module.exports = mongoose.model("Post", PostSchema);