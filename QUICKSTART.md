# 🚀 Quick Start Guide

## Option 1: Local Development (Recommended for Development)

### 1. Install MongoDB Locally
- Download from: https://www.mongodb.com/try/download/community
- Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### 2. Start Backend Server
```bash
cd server

# Create .env file
cp .env.example .env

# Update .env with your values (or use defaults for local development)
# Default MongoDB: mongodb://localhost:27017/cricket-connect

# Install dependencies
npm install

# Start dev server
npm run dev
```
Backend runs on: http://localhost:5000

### 3. Start Frontend Server
```bash
cd client

# Install dependencies
npm install

# Start dev server
npm run dev
```
Frontend runs on: http://localhost:5173

### 4. Test the Application
1. Open http://localhost:5173 in your browser
2. Register a new account
3. Create a team
4. Create a match
5. Join the team/match
6. Test real-time chat

---

## Option 2: Using Docker Compose (Production-like)

```bash
# Start all services
docker-compose up

# MongoDB: localhost:27017
# Backend: http://localhost:5000
# Frontend: http://localhost:5173
```

---

## 🧪 Acceptance Criteria - Testing Checklist

- [ ] ✅ Register/Login works
- [ ] ✅ Create Team works
- [ ] ✅ Join Team works
- [ ] ✅ Create Match works
- [ ] ✅ Join Match works (with player limit check)
- [ ] ✅ Real-time Team Chat works
- [ ] ✅ Protected routes redirect unauthenticated users
- [ ] ✅ JWT tokens persist across page refreshes

---

## 📊 Test Data

### Test User 1:
```
Email: user1@cricket.com
Password: password123
Name: User One
```

### Test User 2:
```
Email: user2@cricket.com
Password: password123
Name: User Two
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in `.env`
- Default: `mongodb://localhost:27017/cricket-connect`

### Port Already in Use
- Backend: `lsof -ti:5000 | xargs kill`
- Frontend: `lsof -ti:5173 | xargs kill`
- MongoDB: `lsof -ti:27017 | xargs kill`

### Socket.IO Connection Error
- Check backend is running on port 5000
- Verify CORS settings in server.js
- Check browser console for errors

### Chat Not Working
- Join room first (navigate to team page)
- Check Socket.IO connection in browser DevTools
- Verify user is a team member

---

## 📚 API Documentation

All API endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

### Authentication
```
POST   /api/auth/register    - Register user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
```

### Teams
```
GET    /api/teams            - Get all teams
POST   /api/teams            - Create team
GET    /api/teams/:id        - Get team details
POST   /api/teams/:id/join   - Join team
```

### Matches
```
GET    /api/matches          - Get all matches
POST   /api/matches          - Create match
GET    /api/matches/:id      - Get match details
POST   /api/matches/:id/join - Join match
```

### Chat
```
GET    /api/chat/:roomId/messages  - Get messages
POST   /api/chat/send              - Send message
```

---

## 🎯 Next Steps for Production

1. Deploy MongoDB Atlas
2. Deploy Backend to Heroku/Railway/Render
3. Deploy Frontend to Vercel/Netlify
4. Update API endpoints in client
5. Set environment variables on hosting platform
6. Configure CORS for production domains
7. Set up CI/CD pipeline

---

Good Luck! 🚀
