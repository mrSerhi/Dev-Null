const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// include Post schema model
const Post = require("../../models/Post");

// include Profile schema model
const Profile = require("../../models/Profile");

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

// @route-full: DELETE /api/posts/:post_id
// @access: Privat
// @desc:  Delete post
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.post_id)
          .then(post => {
            // check if user is current owner of removing post
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ noauthuser: "User is not authtorized" });
            }

            post.remove().then(() => res.json({ postremoved: true }));
          })
          .catch(() => res.status(404).json({ msg: "Post not found" }));
      })
      .catch(() => res.status(404).json({ msg: "Profile not found" }));
  }
);

// @route-full: POST /api/posts/like/:post_id
// @access: Privat
// @desc:  Add Likes to post
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.post_id)
          .then(post => {
            const countLikes = post.likes.filter(like => {
              return like.user.toString() === req.user.id;
            });

            // check if current user is liked post
            if (countLikes.length > 0) {
              return res
                .status(400)
                .json({ liked: "User was liked this post" });
            }

            post.likes.push({ user: req.user.id });
            // save
            post.save().then(post => res.json(post));
          })
          .catch(() => res.status(404).json({ msg: "Post not found" }));
      })
      .catch(() => res.status(404).json({ msg: "Profile not found" }));
  }
);

// @route-full: POST /api/posts/unlike/:post_id
// @access: Privat
// @desc:  Remove Like from post
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.post_id)
          .then(post => {
            const countLikes = post.likes.filter(like => {
              return like.user.toString() === req.user.id;
            });

            if (countLikes.length === 0) {
              res
                .status(400)
                .json({ notliked: "User is not liked this post yet" });
            }

            // remove like
            const index = post.likes.findIndex(like => {
              return like.user.toString() === req.user.id;
            });
            post.likes.splice(index, 1);

            // save
            post.save().then(post => res.json(post));
          })
          .catch(() => res.status(404).json({ mag: "Post not found" }));
      })
      .catch(() => res.status(404).json({ mag: "Profile not found" }));
  }
);

// @route-full: POST /api/posts/comment/:post_id
// @access: Privat
// @desc:  Add comment to post
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // for validation use rules which validate post because we need validate currently text field
        const { error, isValid } = validationPost(req.body);

        if (!isValid) return res.status(400).json(error);

        const newComment = {
          user: req.user.id,
          name: req.body.name,
          avatar: req.body.avatar,
          text: req.body.text
        };

        // add new comment at the begging of comments
        post.comments.unshift(newComment);

        // save
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ mag: "Post not found" }));
  }
);

module.exports = router;
