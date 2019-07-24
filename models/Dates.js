const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatesSchema = new Schema({
  dates: [{ type: String }]
});

const dates = mongoose.model("dates", DatesSchema);
module.exports = dates;
