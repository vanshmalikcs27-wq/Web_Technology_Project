const bcrypt = require('bcrypt');
const { getRow, runQuery } = require('../db');
const { generateToken } = require('../middleware/auth');

// Sign up
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // check existing user (MongoDB)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user (MongoDB)
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    res.json({
      message: "Signup successful ✅",
      user
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
};

    // Generate token
    const token = generateToken(result.id, email);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: result.id,
        email,
        firstName: firstName || '',
        lastName: lastName || ''
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await getRow('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

// Get current user
async function getCurrentUser(req, res) {
  try {
    const user = await getRow('SELECT id, email, firstName, lastName, createdAt FROM users WHERE id = ?', [req.userId]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
}

// Update user profile
async function updateProfile(req, res) {
  try {
    const { firstName, lastName } = req.body;

    await runQuery(
      'UPDATE users SET firstName = ?, lastName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [firstName || '', lastName || '', req.userId]
    );

    const user = await getRow('SELECT id, email, firstName, lastName FROM users WHERE id = ?', [req.userId]);

    res.json({
      success: true,
      message: 'Profile updated',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile
};
