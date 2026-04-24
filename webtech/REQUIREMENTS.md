# Webbio Backend Requirements

## System Requirements
- Node.js: v16.0.0 or higher
- npm: v8.0.0 or higher

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free account or log in
- Create a new project

### 2. Create a Cluster
- Click "Build a Database"
- Select "Shared" (Free tier)
- Choose your preferred cloud provider (AWS, Azure, or GCP)
- Select your region (closest to your users)
- Click "Create Deployment"

### 3. Set Up Security
- **Username/Password**: Create a database user
  - Username: `webbio_user` (or your preferred name)
  - Password: Generate a strong password
  - Save this securely
  
- **Network Access**: Add IP addresses
  - Click "Add My Current IP Address" 
  - Or use `0.0.0.0/0` to allow all IPs (not recommended for production)

### 4. Get Connection String
- Click "Connect" button
- Select "Drivers"
- Choose "Node.js" and version 4.1 or higher
- Copy the connection string
- Format: `mongodb+srv://username:password@cluster-name.mongodb.net/webbio?retryWrites=true&w=majority`

## Installation Instructions

### 1. Clone/Navigate to Repository
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

## Environment Setup

### 1. Create `.env` file
```bash
cp .env.example .env
```

### 2. Edit `.env` with your MongoDB Atlas credentials
```
MONGODB_URI=mongodb+srv://webbio_user:your_password@your-cluster.mongodb.net/webbio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_this_in_production
FRONTEND_URL=http://localhost:3000
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| mongoose | ^7.0.0 | MongoDB ODM |
| bcrypt | ^5.1.0 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| body-parser | ^1.20.2 | Request body parsing |
| dotenv | ^16.3.1 | Environment variables |

## Database Schema

### Users Collection
- email (String, unique)
- password (String)
- firstName (String)
- lastName (String)
- createdAt (Date)
- updatedAt (Date)

### Portfolios Collection
- userId (ObjectId, reference to Users)
- title (String)
- bio (String)
- role (String)
- email (String)
- phone (String)
- website (String)
- template (String)
- data (Object)
- published (Boolean)
- createdAt (Date)
- updatedAt (Date)

### Skills Collection
- portfolioId (ObjectId, reference to Portfolios)
- skill (String)

### Experience Collection
- portfolioId (ObjectId, reference to Portfolios)
- title (String)
- company (String)
- startDate (String)
- endDate (String)
- description (String)

### Education Collection
- portfolioId (ObjectId, reference to Portfolios)
- school (String)
- degree (String)
- field (String)
- startDate (String)
- endDate (String)

### Projects Collection
- portfolioId (ObjectId, reference to Portfolios)
- title (String)
- description (String)
- link (String)

## Troubleshooting

### Connection Refused
- Ensure MongoDB Atlas cluster is active
- Check your IP address is whitelisted
- Verify MONGODB_URI is correct

### Authentication Failed
- Double-check username and password
- Ensure special characters in password are URL-encoded
- Reset password if needed from MongoDB Atlas console

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port

## Production Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV to "production"
- [ ] Whitelist only specific IPs in MongoDB Atlas
- [ ] Enable SSL/TLS for MongoDB connections
- [ ] Set up proper error logging
- [ ] Configure rate limiting
- [ ] Use environment-specific .env files
