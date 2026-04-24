const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Portfolio'
  },
  bio: String,
  role: String,
  email: String,
  phone: String,
  website: String,
  template: {
    type: String,
    default: 'minimal'
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
