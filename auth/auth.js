const express = require("express");
const router = new express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userAPI = require("../api/user");
const minPasswordLength = 4;

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const { name, lastname, password, email } = req.body;
  var errorMsg = null;

  if (!name || !lastname || !password || !email)
    errorMsg = {
      message: "Provide informations",
      status: "warning",
      httpStatus: 403
    };

  if (password.length < minPasswordLength)
    errorMsg = {
      message: `Provide a password with minimum ${minPasswordLength} characters`,
      status: "warning",
      httpStatus: 403
    };

  if (errorMsg) return res.status(errorMsg.httpStatus).json(errorMsg);

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = {
    name,
    lastname,
    email,
    password: hashPass
  };

  if (req.file) newUser.avatar = req.file.secure_url;

  userAPI
    .create(newUser)
    .then(newUserFromDB =>
      req.login(newUserFromDB, err => {
        console.log("passport login error", err);
        if (err) {
          return res.status(500).json({
            message: "something went wrong with automatic login after signup"
          });
        }
        res.status(200).json(req.user);
      })
    )
    .catch(apiErr => {
      console.log(apiErr);
      const error = {
        11000: "the mail already exists in the database"
      };
      const message = {
        text: `something goes wrong : ${apiErr.code}`,
        status: "warning"
      };
      res.status(409).json({ message });
      return;
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    var errorMsg = null;

    if (err) {
      console.log("login error details", failureDetails);

      errorMsg = {
        message: "Something went wrong authenticating user",
        status: "error",
        httpStatus: 520
      };
    }

    if (!user)
      errorMsg = {
        message: "sorry, we coun't find that account",
        status: "warning",
        httpStatus: 404
      };

    if (errorMsg) return res.status(errorMsg.httpStatus).json(errorMsg);

    req.logIn(user, function(err) {
      if (err) {
        console.log("passport login error", err);
        return res.json({ message: "Something went wrong logging in" });
      }

      const { _id: id, name, lastname, email, dates } = req.user;
      //   next(/
      res.status(200).json({
        loginStatus: true,
        user: {
          id,
          name,
          lastname,
          email,
          dates
        }
      });
      //   );
    });
  })(req, res, next);
});

router.post("/signout", (req, res, next) => {
  req.logout();
  res.json({ message: "Success" });
});

router.get("/login", (req, res, next) => {
  console.log("ask is loggedin ???", req.isAuthenticated());
  if (req.isAuthenticated()) {
    const { _id: id, name, lastname, email } = req.user;
    return res.status(200).json({
      loginStatus: true,
      message: "authorized",
      user: {
        id,
        name,
        lastname,
        email
      }
    });
  }
  res.status(403).json({ loginStatus: false, message: "Unauthorized" });
});

module.exports = router;
