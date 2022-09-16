
const express = require("express");
const connect = require("./config/db");

const profile = require("./controllers/profile");
const comment = require("./controllers/comment");
const like = require("./controllers/like");
const post = require("./controllers/post");
const cors = require("cors");
const { login, register } = require("./controllers/auth.controller");

const app = express();
app.use(express.json());
app.use(cors());


app.use("", post);
app.use("", profile);
app.use("", like);
app.use("", comment);
app.post("/login", login);
app.post("/register", register);

//connecting ans starting server


app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000.....");
  } catch (err) {
    console.log(err);
  }
});
