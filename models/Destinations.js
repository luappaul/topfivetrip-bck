const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationsSchema = new Schema({
  destinations: []
});

const destinations = mongoose.model("destinations", destinationsSchema);
module.exports = destinations;
