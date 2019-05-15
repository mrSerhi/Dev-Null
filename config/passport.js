const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { jwtPrivetKey } = require("../config/keys");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtPrivetKey
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // call model method to find user on ID
      User.findById(jwt_payload.id)
        .then(user => {
          // user exist?
          if (user) {
            return done(null, user); // no errors and returns user in req
          }

          return done(null, false, { msg: "User not found..." });
        })
        .catch(ex => console.error(ex));
    })
  );
};
