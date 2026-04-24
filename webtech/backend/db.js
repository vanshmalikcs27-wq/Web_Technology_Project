const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'webbio.db');
let db = null;

// Initialize database
function initializeDatabase() {
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error opening database:', err);
      return;
    }
    console.log('✓ Connected to SQLite database');
    createTables();
  });
}

// Create tables
function createTables() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT,
        lastName TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating users table:', err);
      else console.log('✓ Users table ready');
    });

    // Portfolios table
    db.run(`
      CREATE TABLE IF NOT EXISTS portfolios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        title TEXT,
        bio TEXT,
        role TEXT,
        email TEXT,
        phone TEXT,
        website TEXT,
        template TEXT DEFAULT 'minimal',
        data TEXT,
        published BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating portfolios table:', err);
      else console.log('✓ Portfolios table ready');
    });

    // Skills table
    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolioId INTEGER NOT NULL,
        skill TEXT,
        FOREIGN KEY (portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating skills table:', err);
      else console.log('✓ Skills table ready');
    });

    // Experience table
    db.run(`
      CREATE TABLE IF NOT EXISTS experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolioId INTEGER NOT NULL,
        title TEXT,
        company TEXT,
        startDate TEXT,
        endDate TEXT,
        description TEXT,
        FOREIGN KEY (portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating experience table:', err);
      else console.log('✓ Experience table ready');
    });

    // Education table
    db.run(`
      CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolioId INTEGER NOT NULL,
        school TEXT,
        degree TEXT,
        field TEXT,
        startDate TEXT,
        endDate TEXT,
        FOREIGN KEY (portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating education table:', err);
      else console.log('✓ Education table ready');
    });

    // Projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolioId INTEGER NOT NULL,
        title TEXT,
        description TEXT,
        link TEXT,
        FOREIGN KEY (portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating projects table:', err);
      else console.log('✓ Projects table ready');
    });
  });
}

// Get database connection
function getDB() {
  return db;
}

// Run query helper
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

// Get one row helper
function getRow(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Get all rows helper
function getAllRows(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

module.exports = {
  initializeDatabase,
  getDB,
  runQuery,
  getRow,
  getAllRows
};
