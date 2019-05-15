const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

// import User Model
const User = require("../../models/User");

// @route full: /api/users/test
// @access: Public
// @desc:  Test Users route
router.get("/test", (req, res) => {
  res.json({ msg: "Users route is available" });
});

/**
 * @fullRoute /api/users/register
 * @access Public
 * @desc User Registration
 */
router.post("/register", (req, res) => {
  // Use model method for checking on exsist email -> return promise
  User.findOne({ email: req.body.email }).then(user => {
    // if user exists -> return bad http status and msg else register new User
    if (user) {
      return res.status(400).json({ msg: "email already exists" });
    } else {
      // s: size, r: rating, default: default img
      const awatar = gravatar.url(req.body.email, {
        s: "200",
        r: "rg",
        default: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        awatar
      });
    }
  });
});

module.exports = router;
