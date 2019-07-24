require("dotenv").config();
require("./config/db-connection");
require("./config/passport");

const express = require("express");

const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: process.env.frontURL,
  credentials: true, // required to let axios pass the cookie with any request
  optionsSuccessStatus: 200
};
// cors setup
app.use(cors(corsOptions));
// form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// session init
app.use(
  session({
    saveUninitialized: false,
    resave: true,
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    secret: process.env.SESSION_SECRET
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("server ready"));

///////////////

const auth = require("./auth/auth");
const APIUser = require("./api/user");
const index = require("./routes/index");
const destinationsAPI = require("./api/destinations");
const citiesAPI = require("./api/cities");
const datesAPI = require("./api/dates");

app.use(index);
app.use("/", auth);
app.use("/api/user", APIUser.router);
app.use("/api/destinations", destinationsAPI.router);
app.use("/api/cities", citiesAPI.router);
app.use("/api/dates", datesAPI.router);

app.listen(process.env.PORT, () => {
  console.log("App hosted on: ", process.env.backendURL);
});
