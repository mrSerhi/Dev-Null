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

// @route-full: get /api/posts
// @access: Public
// @desc:  Get all post from Post collection and return sorted array by date(new post is first)
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: "desc" })
    .then(posts => {
      const error = {};

      if (typeof posts === "undefined") {
        error.noposts = "Posts not found";
        res.status(404).json(error);
      }

      res.json(posts);
    })
    .catch(ex => res.status(404).json(ex.message));
});

// @route-full: GET /api/posts/:post_id
// @access: Public
// @desc:  Get post by post_id
router.get("/:post_id", (req, res) => {
  Post.findOne({ _id: req.params.post_id })
    .then(post => {
      if (!post) return res.status(404).json({ msg: "Post not found" });

      res.json(post);
    })
    .catch(() =>
      res
        .status(404)
        .json({ msg: `Not found post with ${req.params.post_id} ID` })
    );
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
