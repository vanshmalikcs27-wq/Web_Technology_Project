# QUICK START GUIDE - Webbio

## 🚀 Get Started in 2 Minutes

### Prerequisites
- Node.js 14+ installed ([Download](https://nodejs.org/))
- A terminal/command prompt

### Option 1: Windows Users
```bash
# Double-click setup.bat
setup.bat
```

### Option 2: Mac/Linux Users
```bash
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup
```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Start server
npm start
```

## ✅ After Setup

1. **Server Running**: You'll see `✓ Webbio Server running on http://localhost:5000`
2. **Open Browser**: Go to `http://localhost:5000`
3. **Create Account**: Click "Sign Up" to create an account
4. **Start Building**: Create your first portfolio!

## 📝 Default Test Account (Optional)

You can create an account with any email/password:
- Email: `test@example.com`
- Password: `password123` (must be at least 6 characters)

## 🔐 Authentication Flow

1. **Sign Up** → Create account with email/password
2. **Backend** → Password hashed, user stored in database
3. **Login** → Receive JWT token
4. **Dashboard** → Access your portfolios
5. **Build** → Create and edit portfolios
6. **Publish** → Make your portfolio live

## 📂 Project Structure

```
frontend/          → Browser-based interface
├── index.html     → Landing page
├── pages/
│   ├── login.html        → Sign in page
│   ├── signup.html       → Create account
│   ├── dashboard.html    → Your portfolios
│   └── builder.html      → Portfolio builder
└── js/api.js            → Backend communication

backend/           → Node.js API Server
├── server.js      → Main server
├── db.js          → Database setup
├── routes/        → API endpoints
└── controllers/   → Business logic
```

## 🆘 Troubleshooting

### "Port 5000 already in use"
- Change port in `backend/server.js` and `frontend/js/api.js`
- Or kill the process using port 5000

### "npm: command not found"
- Install Node.js from https://nodejs.org/

### "Database locked"
- Delete `backend/webbio.db`
- Restart the server

### Login not working
- Clear browser cache/cookies
- Check browser console for errors (F12)
- Ensure server is running

## 📚 API Documentation

See [API Endpoints](README.md#api-endpoints) in README.md

## 🎨 Customize

- Edit `frontend/css/global.css` for styling
- Modify `backend/.env` for configuration
- Add new templates in builder

## 📞 Support

If you encounter issues:
1. Check the browser console (F12)
2. Check terminal output for error messages
3. Restart the server
4. Clear browser cache

## 🎉 You're Ready!

Happy building! 🚀
