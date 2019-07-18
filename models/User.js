const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  destinations: { type: Schema.Types.ObjectId, ref: "destinations" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
