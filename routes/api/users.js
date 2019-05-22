const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtPrivetKey } = require("../../config/keys");
const passport = require("passport");

// import validation for registration
const validateRegister = require("../../validation/register");
// import validation for login
const validateLogin = require("../../validation/login");

// import User Model
const User = require("../../models/User");

// @route full: /api/users/test
// @access: Public
// @desc:  Test Users route
router.get("/test", (req, res) => {
  res.json({ msg: "Users route is available" });
});

//@fullRoute: /api/users/register
//@access: Public
//@desc: User Registration
router.post("/register", (req, res) => {
  // server side validation
  const { error, isValid } = validateRegister(req.body);
  if (!isValid) return res.status(400).json(error);

  // Use model method for checking on exsist email -> return promise
  User.findOne({ email: req.body.email }).then(user => {
    // if user exists -> return bad http status and msg else register new User
    if (user) {
      error.email = "email already exists";

      return res.status(400).json(error);
    } else {
      // s: size, r: rating, d: default-img
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      // password hashing
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash; // save hashing password
          // use mongoose method to save changes and return user object or undefined
          newUser
            .save()
            .then(user => res.json(user))
            .catch(ex => console.error(ex));
        });
      });
    }
  });
});

//  @fullRoute: /api/users/login
//  @access: Public
//  @desc: Varification and Loging user | return JSON WEB TOKEN (JWT)
router.post("/login", (req, res) => {
  // validation
  const { error, isValid } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(error);

  const email = req.body.email;
  const password = req.body.password;

  // search a user on DB
  User.findOne({ email }).then(user => {
    // check on user exist
    if (!user) {
      error.email = "User not found";
      return res.status(404).json(error);
    }

    // compare the passwords
    bcrypt.compare(password, user.password).then(isIdentical => {
      // checking on identicals passwords
      if (isIdentical) {
        // payload -> obj with some info of logged user
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // create JWT
        const options = { expiresIn: "1h" }; // how long token will be fired
        const getToken = (err, token) => {
          if (err) throw err;

          // Headers: { Authorization: Bearer <token>, Content-Type: application/json, ... }
          return res.json({ createdToken: true, token: "Bearer " + token });
        };

        jwt.sign(payload, jwtPrivetKey, options, getToken);
      } else {
        error.password = "Password is inccorect";
        return res.status(400).json(error);
      }
    });
  });
});

//  @fullRoute: /api/users/current
//  @access: Privat
//  @desc: return current authorizated User
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    res.json({
      // return without password and other
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
);

module.exports = router;
