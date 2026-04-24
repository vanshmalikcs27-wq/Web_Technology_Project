const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster-name.mongodb.net/webbio?retryWrites=true&w=majority';

// Initialize Database Connection
async function initializeDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('✗ Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
}

// Export
module.exports = {
  initializeDatabase,
  mongoose
};
