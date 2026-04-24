# Webbio - MongoDB Atlas Setup Guide

## Quick Start - MongoDB Atlas Configuration

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up with your email or Google/GitHub account
3. Create a new project named "Webbio"

### Step 2: Create a Free Database Cluster
1. Click "Build a Database"
2. Select **Shared** (Free tier - 0.5GB storage)
3. Select your cloud provider:
   - **AWS** (recommended - most regions available)
   - **Azure** or **GCP** (alternative options)
4. Choose your nearest region for best performance
5. Click "Create Deployment" and wait 3-5 minutes for cluster creation

### Step 3: Create Database User Credentials
1. In the left sidebar, click **Database Access**
2. Click **Add New Database User**
   - **Username**: `webbio_user` (or your preferred name)
   - **Password**: Generate Strong Password (copy and save it!)
   - **Built-in Role**: `readWriteAnyDatabase`
3. Click **Add User**

### Step 4: Configure Network Access
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Choose one of these options:
   - **Development**: Click "Add My Current IP Address"
   - **Production**: Add your server's IP only
   - **Testing**: Use `0.0.0.0/0` (allows all IPs - NOT recommended for production!)
4. Click **Add Entry**

### Step 5: Get Your Connection String
1. Go to your cluster and click **Connect**
2. Select **Drivers** (not Compass or MongoDB Shell)
3. Choose **Node.js** as your driver
4. Copy the connection string:
   ```
   mongodb+srv://webbio_user:password@cluster-name.mongodb.net/webbio?retryWrites=true&w=majority
   ```

### Step 6: Configure Your Application

#### Option A: Using .env file (Recommended)
```bash
cd backend
cp .env.example .env
```

Edit `.env` file and replace:
```
MONGODB_URI=mongodb+srv://webbio_user:YOUR_PASSWORD@your-cluster-name.mongodb.net/webbio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=generate_a_random_string_here
```

#### Option B: Using Environment Variables
Set these in your system/host environment:
```bash
MONGODB_URI=your_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

### Step 7: Install Dependencies
```bash
cd backend
npm install
```

This will install:
- mongoose (MongoDB driver)
- express (web framework)
- bcrypt (password hashing)
- jsonwebtoken (auth tokens)
- cors, body-parser, dotenv

### Step 8: Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

You should see:
```
✓ Connected to MongoDB Atlas
✓ Webbio Server running on http://localhost:5000
```

---

## Important: Security Best Practices

### 🔒 Never Commit .env File
Add to `.gitignore`:
```
.env
node_modules/
*.db
```

### 🔐 For Production Deployment
1. Use a strong JWT_SECRET: 
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Change `NODE_ENV` to `production`
3. Whitelist only your server IP in MongoDB Atlas
4. Enable encryption/SSL in MongoDB
5. Use different credentials for production

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `Error: connect ECONNREFUSED` | Check MONGODB_URI is correct, cluster is running |
| `Authentication Failed` | Verify username/password, check for special chars |
| `IP Address Not Whitelisted` | Add your IP in MongoDB Network Access settings |
| `Port 5000 already in use` | Change PORT in .env or kill process using port |
| `Cannot find module 'mongoose'` | Run `npm install` in backend folder |

---

## Database Collections Created Automatically

When the server starts, these collections are created in MongoDB:

- **users** - Stores user accounts with encrypted passwords
- **portfolios** - Stores portfolio data for each user
- **skills** - Skills associated with portfolios
- **experience** - Work experience entries
- **education** - Educational background
- **projects** - Project/portfolio items

---

## Next Steps

1. Test the API: Open browser and go to `http://localhost:5000/api/health`
2. View database: Open MongoDB Atlas → Collections to see your data
3. Connect frontend: Update API endpoints in `frontend/js/api.js` if needed
4. Deploy: Push to Heroku, Railway, Render, or your preferred host

