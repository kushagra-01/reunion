
const express = require("express");
const connect = require("./config/db");

const shoe = require("./controllers/product");
const comment = require("./controllers/comment");
const like = require("./controllers/like");
const prod = require("./controllers/post");
const cors = require("cors");
const { login, register } = require("./controllers/auth.controller");

const app = express();
app.use(express.json());
app.use(cors());


app.use("", prod);
app.use("", shoe);
app.use("", like);
app.use("", comment);
app.post("", login);
app.post("", register);

//connecting ans starting server


app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000.....");
  } catch (err) {
    console.log(err);
  }
});
