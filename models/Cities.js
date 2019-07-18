const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  City: "",
  country: String,
  META_IATA: String,
  IATA: String,
  ICAO: String,
  latitude: String,
  longitude: String
});

const Cities = mongoose.model("Cities", CitySchema);
module.exports = Cities;
