const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  dates: { type: Schema.Types.ObjectId, ref: "dates" },
  destinations: { type: Schema.Types.ObjectId, ref: "destinations" },
  location: { type: String }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
