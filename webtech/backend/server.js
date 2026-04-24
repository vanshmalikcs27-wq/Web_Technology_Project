const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

// Initialize database
const { initializeDatabase } = require('./db');

// Express app
const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("API working 🚀");
}):

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize database and start server
initializeDatabase().then(() => {
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/portfolio', portfolioRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
  });

  // Serve landing page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`✓ Webbio Server running on http://localhost:${PORT}`);
    console.log(`✓ API available at http://localhost:${PORT}/api`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
