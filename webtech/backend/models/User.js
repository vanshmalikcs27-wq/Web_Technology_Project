const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String
});

// 🔥 FIX
module.exports = mongoose.models.User || mongoose.model("User", userSchema);