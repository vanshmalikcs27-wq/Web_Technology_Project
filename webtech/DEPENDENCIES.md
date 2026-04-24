# 📋 Webbio - Complete Requirements & Dependencies

## System Requirements

### Runtime Environment
- **Node.js**: v16.0.0 or higher
  - Download: https://nodejs.org/
  - Verify: `node --version` (should show v16+)
- **npm**: v8.0.0 or higher
  - Verify: `npm --version`

### Database
- **MongoDB Atlas**: Free cloud database (0.5GB tier)
  - Account: https://www.mongodb.com/cloud/atlas
  - Region: Select closest to your location
  - Cluster: Free "M0" tier recommended

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## Backend Dependencies

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^4.18.2 | Web server framework |
| **mongoose** | ^7.0.0 | MongoDB object mapper |

### Security
| Package | Version | Purpose |
|---------|---------|---------|
| **bcrypt** | ^5.1.0 | Password hashing & verification |
| **jsonwebtoken** | ^9.0.2 | JWT token generation & validation |

### Middleware & Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| **cors** | ^2.8.5 | Cross-Origin Resource Sharing |
| **body-parser** | ^1.20.2 | Request body parsing (JSON/URL-encoded) |
| **dotenv** | ^16.3.1 | Environment variables management |

### Installation
```bash
cd backend
npm install
```

---

## Environment Variables Required

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/webbio?retryWrites=true&w=majority

# Server Settings
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your_super_secret_random_string_min_32_chars

# Frontend Configuration (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Environment Variable Explanations

| Variable | Example | Purpose |
|----------|---------|---------|
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas connection string |
| `PORT` | `5000` | Server port (change if 5000 is in use) |
| `NODE_ENV` | `development` or `production` | Application environment |
| `JWT_SECRET` | Random 32+ char string | Secret key for JWT tokens (must be secure!) |
| `FRONTEND_URL` | `http://localhost:3000` | Frontend URL for CORS |

**⚠️ Security Warning**: Never commit `.env` to git! It's already in `.gitignore`.

---

## Frontend Dependencies

### Built-in (No NPM Required)
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3

### External Libraries (Optional Enhancements)
- None required for basic functionality
- Future: Could add frameworks like React, Vue, or Svelte

---

## MongoDB Atlas Database Schema

### Collections & Fields

#### Users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashed_password",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

#### Portfolios Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User),
  "title": "My Portfolio",
  "bio": "Bio text",
  "role": "Full Stack Developer",
  "email": "contact@example.com",
  "phone": "+1234567890",
  "website": "https://example.com",
  "template": "minimal",
  "data": {},
  "published": true,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

#### Skills Collection
```json
{
  "_id": ObjectId,
  "portfolioId": ObjectId (ref: Portfolio),
  "skill": "JavaScript"
}
```

#### Experience Collection
```json
{
  "_id": ObjectId,
  "portfolioId": ObjectId (ref: Portfolio),
  "title": "Senior Developer",
  "company": "Tech Corp",
  "startDate": "2020-01",
  "endDate": "2023-06",
  "description": "Worked on..."
}
```

#### Education Collection
```json
{
  "_id": ObjectId,
  "portfolioId": ObjectId (ref: Portfolio),
  "school": "University of Tech",
  "degree": "Bachelor",
  "field": "Computer Science",
  "startDate": "2016-09",
  "endDate": "2020-05"
}
```

#### Projects Collection
```json
{
  "_id": ObjectId,
  "portfolioId": ObjectId (ref: Portfolio),
  "title": "Project Name",
  "description": "Project description",
  "link": "https://project-link.com"
}
```

---

## Setup Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB Atlas account created
- [ ] Cluster created in MongoDB Atlas
- [ ] Database user credentials created
- [ ] IP address whitelisted in MongoDB
- [ ] Connection string copied
- [ ] Backend folder: `npm install` completed
- [ ] `.env` file created with MONGODB_URI
- [ ] Server starts: `npm run dev` (shows connected to MongoDB)
- [ ] Frontend loads at `http://localhost:5000`

---

## Troubleshooting

### Connection Issues
```
Error: connect ECONNREFUSED
→ Check MONGODB_URI in .env
→ Ensure MongoDB cluster is running
→ Verify IP is whitelisted
```

### Authentication Errors
```
Error: Authentication failed
→ Verify username/password
→ Check special characters are URL-encoded
→ Reset password in MongoDB Atlas if needed
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
→ Change PORT in .env (e.g., 5001)
→ Or kill process: npx kill-port 5000
```

### Module Not Found
```
Error: Cannot find module 'mongoose'
→ Run: npm install in backend directory
→ Verify package.json exists
```

---

## Production Deployment Requirements

### Before Deploying
1. **Strong JWT Secret**: Use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. **Set NODE_ENV**: Change to `production`
3. **Restrict Network**: Whitelist only server IP in MongoDB
4. **Enable SSL**: Use HTTPS in production
5. **Error Logging**: Set up logging service (e.g., Sentry)
6. **Rate Limiting**: Add rate limiting middleware

### Recommended Hosting Platforms
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Database**: MongoDB Atlas (already using)
- **Frontend**: Vercel, Netlify, GitHub Pages

---

## File Structure
```
webtech/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── portfolioController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── portfolio.js
│   ├── db.js (MongoDB schema definitions)
│   ├── server.js (Express app entry point)
│   ├── package.json (Dependencies)
│   ├── .env.example (Environment template)
│   └── .env (Your credentials - DON'T COMMIT!)
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   │   ├── api.js (API calls)
│   │   └── ui.js (UI logic)
│   └── pages/
├── QUICKSTART.md
├── REQUIREMENTS.md (This file)
├── MONGODB_SETUP.md (MongoDB setup guide)
└── .gitignore
```

---

## Quick Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Check if server is running
curl http://localhost:5000/api/health
```

---

## Support & Resources

- **MongoDB Atlas Docs**: https://docs.mongodb.com/atlas/
- **Mongoose Docs**: https://mongoosejs.com/
- **Express Docs**: https://expressjs.com/
- **Node.js Docs**: https://nodejs.org/docs/

---

**Last Updated**: 2026
**Version**: 2.0 (MongoDB Atlas Migration)
