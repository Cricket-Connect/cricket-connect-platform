import axios from "axios";

// Determine API base URL based on environment
let baseURL = "http://localhost:5000/api";

if (typeof window !== "undefined") {
  const protocol = window.location.protocol; // 'https:' or 'http:'
  const hostname = window.location.hostname;
  
  // Check if we're on GitHub Codespaces
  if (hostname.includes(".app.github.dev")) {
    // Replace the port number in the subdomain
    // Example: zany-eureka-...-5173.app.github.dev → zany-eureka-...-5000.app.github.dev
    const backendHost = hostname.replace(
      /-\d+\.app\.github\.dev$/,
      "-5000.app.github.dev"
    );
    // Use HTTPS for Codespaces (it enforces HTTPS)
    baseURL = `https://${backendHost}/api`;
  } else if (hostname.includes(".amazonaws.com")) {
    // For AWS deployments - use HTTPS
    baseURL = `https://${hostname}:5000/api`;
  } else if (hostname.includes("vercel.app") || hostname.includes("netlify.app")) {
    // For Vercel/Netlify - these enforce HTTPS
    baseURL = `https://${hostname}/api`;
  }
  // For localhost, keep HTTP (default)
}

console.log("API Base URL:", baseURL);

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Teams
export const createTeam = (data) => API.post("/teams", data);
export const getAllTeams = () => API.get("/teams");
export const getTeam = (id) => API.get(`/teams/${id}`);
export const joinTeam = (id) => API.post(`/teams/${id}/join`);

// Matches
export const createMatch = (data) => API.post("/matches", data);
export const getAllMatches = () => API.get("/matches");
export const getMatch = (id) => API.get(`/matches/${id}`);
export const joinMatch = (id) => API.post(`/matches/${id}/join`);

// Chat
export const getMessages = (roomId) => API.get(`/chat/${roomId}/messages`);
export const sendMessage = (data) => API.post("/chat/send", data);

export default API;
