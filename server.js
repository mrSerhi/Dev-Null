const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;

// set Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api routes
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

// Passport Middlewere for auth
require("./config/passport")(passport);
app.use(passport.initialize());

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Server is running on ${port} port`));
