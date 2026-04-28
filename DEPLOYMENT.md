# 🚀 Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier available)
- Hosting platform (Heroku, Railway, Render, Vercel, or Netlify)
- GitHub account (for CI/CD)

---

## 📋 Step 1: Prepare for Deployment

### 1.1 Create MongoDB Atlas Database
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Create .env file in server with:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cricket-connect
   JWT_SECRET=your_secure_secret_key_here
   PORT=5000
   NODE_ENV=production
   ```

### 1.2 Update CORS Settings
In `server/server.js`, update CORS for your deployments:
```javascript
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
```

---

## 🖥️ Option A: Deploy to Heroku

### Backend Deployment
1. Install Heroku CLI
2. Create `Procfile` in server folder:
   ```
   web: npm start
   ```
3. Deploy:
   ```bash
   cd server
   heroku login
   heroku create your-app-name
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   git push heroku main
   ```

### Frontend Deployment
1. Build frontend:
   ```bash
   cd client
   npm run build
   ```
2. Deploy to Vercel/Netlify or as static site on Heroku

---

## 🚂 Option B: Deploy to Railway

### Backend Deployment
1. Connect GitHub repo
2. Create new project
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

### Frontend Deployment
1. Create new service
2. Connect frontend folder
3. Build command: `npm run build`
4. Start command: `npm run preview`

---

## ⚡ Option C: Deploy to Vercel (Frontend) + Render (Backend)

### Backend on Render
1. Create new Web Service on render.com
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (MONGO_URI, JWT_SECRET)
6. Deploy

### Frontend on Vercel
1. Push code to GitHub
2. Import project on vercel.com
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
6. Deploy

### Update Frontend API URL
In `client/src/services/api.js`, update:
```javascript
const API = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:5000/api',
});
```

---

## 🐳 Option D: Deploy with Docker

### Build Docker Images
```bash
docker build -t cricket-connect-server ./server
docker build -t cricket-connect-client ./client
```

### Deploy to Container Registry
```bash
# AWS ECR, Google Container Registry, or Docker Hub
docker tag cricket-connect-server your-registry/cricket-connect-server:latest
docker push your-registry/cricket-connect-server:latest

docker tag cricket-connect-client your-registry/cricket-connect-client:latest
docker push your-registry/cricket-connect-client:latest
```

### Deploy to Kubernetes
```bash
kubectl apply -f k8s-deployment.yaml
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd server && npm install && npm test
      - run: npm run build
      - run: deploy to production

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd client && npm install && npm run build
      - run: deploy to production
```

---

## 📊 Domain & SSL

1. Register domain (Namecheap, GoDaddy, etc.)
2. Point DNS to your hosting
3. Enable SSL certificate (usually automatic)

---

## 🔐 Environment Variables for Production

### Server (.env)
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cricket-connect
JWT_SECRET=your_very_secure_secret_key_with_random_chars
PORT=5000
NODE_ENV=production
```

### Client (.env)
```
VITE_API_URL=https://your-backend-domain.com
```

---

## ✅ Post-Deployment Checklist

- [ ] Test register/login
- [ ] Test all CRUD operations
- [ ] Test real-time chat
- [ ] Check SSL certificate
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Set up backups for MongoDB
- [ ] Configure auto-scaling
- [ ] Set up error alerts
- [ ] Test from different browsers/devices
- [ ] Check performance (Lighthouse)

---

## 📈 Monitoring & Analytics

### Add Sentry for Error Tracking
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your_sentry_dsn",
  environment: "production",
});
```

### Add Google Analytics
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

---

## 🎯 Scaling Strategies

1. **Database**: Enable sharding on MongoDB Atlas
2. **Backend**: Use PM2 for clustering
3. **Frontend**: Use CDN for static assets
4. **Cache**: Implement Redis caching
5. **Load Balancer**: Use nginx or AWS ELB

---

## 🆘 Common Issues

### CORS Errors
- Update CORS origin in server.js
- Check frontend URL matches

### Socket.IO Connection Failed
- Ensure backend is running
- Check firewall/proxy settings
- Verify socket.io version compatibility

### MongoDB Connection Timeout
- Whitelist IP address in MongoDB Atlas
- Check connection string
- Verify network connectivity

---

## 📞 Support & Maintenance

- Monitor error logs regularly
- Update dependencies monthly
- Backup database weekly
- Monitor performance metrics
- Check security updates

---

Great Job! Your Cricket Connect app is now live! 🎉
