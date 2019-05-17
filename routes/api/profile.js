const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

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

// @route-full: /api/profile/
// @access: Privat
// @desc:  Get/check Current Profile of User
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // will be used like a storage of errors
    const error = {};
    //
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

module.exports = router;
