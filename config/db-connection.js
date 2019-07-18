const mongoose = require("mongoose");

//data import from json file -> uncommented if you want to add new set of data

// const data = require("../data/CityData.json");
// const Cities = require("../models/Cities");
// Cities.insertMany(data)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to the database");
});
