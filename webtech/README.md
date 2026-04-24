# Webbio - Full Stack Portfolio Builder

A complete full-stack application for creating professional portfolios with authentication and database integration.

## Project Structure

```
webtech/
├── frontend/                 # Frontend application
│   ├── index.html           # Landing page
│   ├── pages/
│   │   ├── login.html       # Login page
│   │   ├── signup.html      # Sign up page
│   │   ├── dashboard.html   # User dashboard
│   │   └── builder.html     # Portfolio builder
│   ├── css/
│   │   └── global.css       # Global styles
│   └── js/
│       ├── api.js           # API communication
│       └── ui.js            # UI helpers
│
├── backend/                  # Backend API
│   ├── server.js            # Main server file
│   ├── db.js                # Database setup
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment variables
│   ├── middleware/
│   │   └── auth.js          # JWT authentication
│   ├── routes/
│   │   ├── auth.js          # Auth endpoints
│   │   └── portfolio.js     # Portfolio endpoints
│   └── controllers/
│       ├── authController.js
│       └── portfolioController.js
│
└── README.md                # This file
```

## Features

✅ **User Authentication**
- Sign up with email and password
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes

✅ **Portfolio Management**
- Create multiple portfolios
- Edit portfolio content
- Publish portfolios
- Delete portfolios

✅ **Database**
- SQLite for data persistence
- Automatic schema creation
- User and portfolio relationships

## Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Fetch API for backend communication
- LocalStorage for token management

**Backend:**
- Node.js
- Express.js
- SQLite3
- JWT (JSON Web Tokens)
- bcrypt for password hashing

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The server will start on `http://localhost:5000`

### 3. Open Frontend in Browser

```bash
# Simply open in your browser
open index.html
# or navigate to
http://localhost:5000
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Portfolio

- `POST /api/portfolio` - Create portfolio (requires auth)
- `GET /api/portfolio` - Get user's portfolios (requires auth)
- `GET /api/portfolio/:id` - Get portfolio details (requires auth)
- `PUT /api/portfolio/:id` - Update portfolio (requires auth)
- `DELETE /api/portfolio/:id` - Delete portfolio (requires auth)
- `POST /api/portfolio/:id/publish` - Publish portfolio (requires auth)

## Authentication Flow

1. **Sign Up**: User creates account with email, password, first name, last name
2. **Server**: Password is hashed, user stored in database, JWT token generated
3. **Token Storage**: Token saved in browser's localStorage
4. **Protected Routes**: Token sent in Authorization header for API requests
5. **Verification**: Server verifies token on protected endpoints

## Default Credentials (for testing)

After signing up, use your created credentials to log in.

## Troubleshooting

### Backend won't start
- Ensure Node.js is installed: `node --version`
- Try deleting `webbio.db` and restarting
- Check port 5000 is available

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check CORS is enabled
- Open browser console for error messages

### Can't create account
- Ensure password is at least 6 characters
- Email must be valid format
- Email shouldn't already be registered

## Next Steps

1. **Enhance Portfolio Builder**
   - Add more template options
   - Implement rich text editor
   - Add image upload

2. **Add Features**
   - Portfolio preview mode
   - Custom domain support
   - Email notifications
   - Social media integration

3. **Deploy**
   - Use services like Heroku, Vercel, or AWS
   - Set up environment variables
   - Configure database for production

## Contributing

Feel free to contribute and improve the project!

## Author

Suraj Kumar - CS 23411206 - 3CSE2

## License

MIT
