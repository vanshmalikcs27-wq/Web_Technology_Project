const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster-name.mongodb.net/webbio?retryWrites=true&w=majority';

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
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

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  bio: String,
  role: String,
  email: String,
  phone: String,
  website: String,
  template: {
    type: String,
    default: 'minimal'
  },
  data: mongoose.Schema.Types.Mixed,
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

// Skills Schema
const skillSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  skill: String
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  title: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String
});

// Education Schema
const educationSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  school: String,
  degree: String,
  field: String,
  startDate: String,
  endDate: String
});

// Projects Schema
const projectSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  title: String,
  description: String,
  link: String
});

// Create Models
const User = mongoose.model('User', userSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Education = mongoose.model('Education', educationSchema);
const Project = mongoose.model('Project', projectSchema);

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

// Export functions and models
module.exports = {
  initializeDatabase,
  User,
  Portfolio,
  Skill,
  Experience,
  Education,
  Project,
  mongoose
};
