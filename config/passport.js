const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const userAPI = require("./../api/user");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  // console.log("@deserializeUser", id);
  userAPI
    .getOne(id)
    .then(user => {
      console.log("cool, user fetched from db ", user);

      done(null, user);
    })
    .catch(err => {
      console.log("not cool");
      done(err, null);
    });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, function(email, passwd, next) {
    userAPI
      .getBy("email", email)
      .then(user => {
        if (!user)
          // if user === null
          return next(null, false, { message: "Incorrect email" });
        if (!bcrypt.compareSync(passwd, user.password))
          // if provided password is not valid
          return next(null, false, {
            message: "Incorrect password"
          });
        else next(null, user);
      })
      .catch(dbErr => {
        console.log(dbErr);
        next(dbErr, null);
      });
  })
);
