const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => console.log(`Server is running on ${port} port`));
