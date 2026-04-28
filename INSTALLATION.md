# 🚀 INSTALLATION & VERIFICATION CHECKLIST

## ✅ Pre-Installation Setup

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed or Docker available (`docker --version`)
- [ ] Git installed (`git --version`)

---

## 🔧 Installation Steps

### Step 1: Backend Installation
```bash
cd server
npm install
```
**Expected Output:**
- No errors
- node_modules folder created
- All dependencies installed

### Step 2: Backend Environment Setup
```bash
cp .env.example .env
# Edit .env with your MongoDB URI:
# MONGO_URI=mongodb://localhost:27017/cricket-connect
```

### Step 3: MongoDB Setup
**Option A - Docker:**
```bash
docker run -d -p 27017:27017 --name cricket-mongodb mongo:latest
```

**Option B - MongoDB Atlas:**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGO_URI in server/.env

### Step 4: Frontend Installation
```bash
cd ../client
npm install
```
**Expected Output:**
- No errors
- node_modules folder created
- Vite configured

---

## ✨ Running the Application

### In 3 Separate Terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Expected: Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Expected: Server running on port 5173
```

**Terminal 3 - MongoDB (if local):**
```bash
docker start cricket-mongodb
# Or if not created:
docker run -d -p 27017:27017 --name cricket-mongodb mongo:latest
```

---

## 🌐 Access Points

After all services are running:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | User interface |
| Backend | http://localhost:5000 | API server |
| API Health | http://localhost:5000/health | Health check |
| MongoDB | localhost:27017 | Database |

---

## 🧪 Quick Test Workflow

1. **Open Frontend App**
   - Go to http://localhost:5173
   - Should see login page

2. **Register New Account**
   - Click "Register"
   - Fill in name, email, password
   - Click "Register"
   - Should redirect to Dashboard

3. **Create a Team**
   - Click "Create Team"
   - Enter team name
   - Click "Create"
   - Team should appear in list

4. **Create a Match**
   - Click "Create Match"
   - Fill in details (title, players, location, date/time)
   - Click "Create"
   - Match should appear in list

5. **Test Real-Time Chat**
   - Click on team card to open team page
   - See chat box at bottom
   - Type message and send
   - Message should appear in chat

---

## ✅ Verification Checklist

### Backend Verification
- [ ] Server starts without errors
- [ ] Database connects successfully
- [ ] Health check endpoint responds
- [ ] API routes are accessible

### Frontend Verification
- [ ] Application loads
- [ ] React DevTools show components
- [ ] Console has no critical errors
- [ ] Styling is applied correctly

### Authentication Verification
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] JWT token stored in localStorage
- [ ] Protected routes redirect when not logged in

### Features Verification
- [ ] Create team works
- [ ] Join team works
- [ ] Create match works
- [ ] Join match works
- [ ] Chat sends/receives messages
- [ ] Player limit prevents overflow

### Database Verification
```bash
# Connect to MongoDB
mongo

# Switch to database
use cricket-connect

# Check collections
show collections

# View users
db.users.find().pretty()

# View teams
db.teams.find().pretty()

# View matches
db.matches.find().pretty()

# View messages
db.messages.find().pretty()
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify port 27017 is not blocked

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill it
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Dependencies Issue
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Socket.IO Connection Failed
- Ensure backend is running
- Check CORS origin in server.js
- Verify frontend URL matches CORS

### CORS Error
Update `server/server.js`:
```javascript
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
```

---

## 🔍 API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Teams (with token)
```bash
curl -X GET http://localhost:5000/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📦 Build for Production

### Frontend Build
```bash
cd client
npm run build
# Creates dist/ folder with optimized files
```

### Backend Production Start
```bash
cd server
NODE_ENV=production npm start
```

---

## 📊 Performance Optimization

### Frontend
- Tree-shaking enabled in Vite
- CSS minification enabled
- Code splitting by route
- Lazy loading for components

### Backend
- Connection pooling for MongoDB
- Compression middleware
- Caching strategies
- Error handling

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a strong value
- [ ] Use HTTPS in production
- [ ] Set secure MongoDB username/password
- [ ] Enable MongoDB IP whitelist
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Implement audit logging

---

## 📈 Next Steps

1. ✅ **Local Testing** - Run through all features
2. ⏭️ **Code Review** - Check code quality
3. ⏭️ **Add Tests** - Unit & integration tests
4. ⏭️ **Performance** - Profile & optimize
5. ⏭️ **Deployment** - Follow DEPLOYMENT.md
6. ⏭️ **Monitoring** - Set up error tracking
7. ⏭️ **Maintenance** - Regular updates

---

## 📞 Support Resources

- Backend Issues: Check server.js and controllers/
- Frontend Issues: Check App.jsx and services/api.js
- Database Issues: Check models/ and config/db.js
- Chat Issues: Check socket/socketHandler.js

---

## 🎯 Success Criteria

Your setup is complete when:
- ✅ All 3 services run without errors
- ✅ Can register and login
- ✅ Can create teams and matches
- ✅ Real-time chat works
- ✅ No CORS errors
- ✅ No MongoDB connection errors
- ✅ All CRUD operations work

---

**Congratulations! You're ready to develop/deploy Cricket Connect!** 🎉
