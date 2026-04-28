# Cricket Connect

A full-stack MERN application for cricket team management and match coordination with real-time chat.

## 🏗️ Project Structure

```
cricket-connect/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API service
│   │   ├── context/        # Auth context
│   │   ├── styles/         # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── server/                 # Node.js Backend
    ├── controllers/        # Business logic
    ├── models/            # MongoDB schemas
    ├── routes/            # API routes
    ├── middleware/        # Auth middleware
    ├── socket/            # Socket.IO configuration
    ├── config/            # Database config
    ├── package.json
    ├── app.js
    ├── server.js
    └── .env.example
```

## 📋 Features

✅ User Authentication (Register/Login)
✅ Team Management (Create, Join Teams)
✅ Match Management (Create, Join Matches)
✅ Real-time Team Chat (Socket.IO)
✅ Protected Routes
✅ JWT Authentication

## 🛠️ Tech Stack

**Frontend:**
- React 18+
- Vite
- React Router DOM
- Axios
- Socket.IO Client

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.IO

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16+
- MongoDB 4.4+

### Backend Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret

4. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Install dependencies:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm run dev
```

Client runs on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Teams
- `POST /api/teams` - Create team (Protected)
- `GET /api/teams` - Get all teams (Protected)
- `GET /api/teams/:id` - Get team details (Protected)
- `POST /api/teams/:id/join` - Join team (Protected)

### Matches
- `POST /api/matches` - Create match (Protected)
- `GET /api/matches` - Get all matches (Protected)
- `GET /api/matches/:id` - Get match details (Protected)
- `POST /api/matches/:id/join` - Join match (Protected)

### Chat
- `GET /api/chat/:roomId/messages` - Get messages (Protected)
- `POST /api/chat/send` - Send message (Protected)

## 🔌 Socket.IO Events

### Client Events
- `join_room` - Join a chat room
- `send_message` - Send a message
- `leave_room` - Leave a chat room

### Server Events
- `room_joined` - Confirmation of joining room
- `receive_message` - Receive new messages
- `user_joined` - User joined room
- `user_left` - User left room

## 🧪 Testing the Application

1. Register two accounts
2. Create a team
3. Join the team with the second account
4. Create a match
5. Join the match with both accounts
6. Go to team page to see real-time chat
7. Send messages and see them appear in real-time

## 📝 Models

### User
- name: String
- email: String (unique)
- password: String (hashed)
- teams: [ObjectId]

### Team
- name: String
- captainId: ObjectId (User)
- members: [ObjectId]

### Match
- title: String
- createdBy: ObjectId (User)
- teamId: ObjectId (Team) - optional
- playersJoined: [ObjectId]
- maxPlayers: Number
- location: String
- dateTime: Date
- status: String (open, full, completed)

### ChatRoom
- type: String (team)
- referenceId: ObjectId (Team)
- members: [ObjectId]

### Message
- roomId: ObjectId (ChatRoom)
- senderId: ObjectId (User)
- content: String
- createdAt: Date

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- Input validation
- CORS enabled
- Membership verification for chat access

## 📜 License

MIT

## 👨‍💻 Author

Created with ❤️
