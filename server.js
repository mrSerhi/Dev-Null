const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app.get("/", (req, res) => {
  res.send("Hello Server!!!");
});

// DB config
const db = require("./config/keys");

// connect to the mongoDB
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true })
  .then(() => console.info("MongoDB connected"))
  .catch(ex => console.error(ex));

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Server is running on ${port} port`));
