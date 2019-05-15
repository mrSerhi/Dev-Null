const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

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
  // Use model method for checking on exsist email -> return promise
  User.findOne({ email: req.body.email }).then(user => {
    // if user exists -> return bad http status and msg else register new User
    if (user) {
      return res.status(400).json({ msg: "email already exists" });
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
  const email = req.body.email;
  const password = req.body.password;

  // search a user on DB
  User.findOne({ email }).then(user => {
    // check on user exist
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // compare the passwords
    bcrypt.compare(password, user.password).then(isIdentical => {
      // checking on identicals passwords
      if (isIdentical) {
        // To the fuature need to JWT
        res.json({ msg: "Identical is true" });
      } else {
        res.status(400).json({ msg: "Password is inccorect" });
      }
    });
  });
});

module.exports = router;
