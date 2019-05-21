const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// include Post schema model
const Post = require("../../models/Post");

// include post validation
const validationPost = require("../../validation/post");

// @route full: /api/posts/test
// @access: Public
// @desc:  Test Posts route
router.get("/test", (req, res) => {
  res.json({ msg: "Posts route is available" });
});

// @route-full: POST /api/posts
// @access: Privat
// @desc:  Create post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validation
    const { error, isValid } = validationPost(req.body);

    if (!isValid) return res.status(400).json(error);

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(ex => res.status(400).json(ex));
  }
);

module.exports = router;
