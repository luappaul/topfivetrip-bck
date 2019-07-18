require("dotenv").config();
require("./config/db-connection");
require("./config/passport");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// //authenticating route
// const authRoute = require("./auth/auth");
// app.use("/auth", authRoute);

const corsOption = {
  credentials: true,
  origin: process.env.frontendURL
};

app.use(cors(corsOption));

const index = require("./routes/index");
const destinationsAPI = require("./api/destinations");
const citiesAPI = require("./api/cities");

app.use(index);
app.use("/api/destinations", destinationsAPI.router);
app.use("/api/cities", citiesAPI.router);

app.listen(process.env.PORT, () => {
  console.log("App hosted on: ", process.env.backendURL);
});
