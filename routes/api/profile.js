const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// include profile validation
const profileValidation = require("../../validation/profile");

// include Profile model
const Profile = require("../../models/Profile");
// include User model
const User = require("../../models/User");

// @route full: /api/profile/test
// @access: Public
// @desc:  Test Profile route
router.get("/test", (req, res) => {
  res.json({ msg: "Profile route is available" });
});

// @route-full: GET /api/profile/
// @access: Privat
// @desc:  Get/check Current Profile of User
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // will be used like a storage of errors
    const error = {};
    // search on user profile exists
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        error.noprofile = "User don't has a profile yet";
        // check on profile exist
        if (!profile) return res.status(404).json(error);

        res.json(profile);
      })
      .catch(ex => res.status(404).json(ex));
  }
);

// @route-full: POST /api/profile/
// @access: Privat
// @desc:  Create/Update Current Profile of User
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validation
    const { error, isValid } = profileValidation(req.body);

    if (!isValid) return res.status(400).json(error);

    // create profile object which will be contains getting values of form
    const newProfile = {};
    newProfile.user = req.user.id;

    // checks if values is come in
    if (req.body.handle) newProfile.handle = req.body.handle;
    if (req.body.company) newProfile.company = req.body.company;
    if (req.body.website) newProfile.website = req.body.website;
    if (req.body.location) newProfile.location = req.body.location;
    if (req.body.status) newProfile.status = req.body.status;
    if (req.body.bio) newProfile.bio = req.body.bio;
    if (req.body.githubusername) {
      newProfile.githubusername = req.body.githubusername;
    }

    // skills must be a string: 'css, js, html, node'
    if (typeof req.body.skills !== "undefined") {
      newProfile.skills = req.body.skills.split(",");
    }

    // social
    newProfile.social = {}; //initial is empty obj
    if (req.body.youtube) newProfile.social.youtube = req.body.youtube;
    if (req.body.twitter) newProfile.social.twitter = req.body.twitter;
    if (req.body.facebook) newProfile.social.facebook = req.body.facebook;
    if (req.body.linkedin) newProfile.social.linkedin = req.body.linkedin;
    if (req.body.instagram) newProfile.social.instagram = req.body.instagram;

    // search on user profile exists
    Profile.findOne({ user: req.user.id }).then(profile => {
      // if profile exists -> update profile, else -> create a new profile
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: newProfile },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // check if a profile handle prop is exists
        Profile.findOne({ handle: newProfile.handle }).then(profile => {
          if (profile) {
            error.handle = "Handle already exists";
            res.status(400).json(error);
          }

          // create new profile
          new Profile(newProfile).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
