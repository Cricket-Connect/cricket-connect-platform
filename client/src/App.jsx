import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TeamPage from "./pages/TeamPage";
import MatchPage from "./pages/MatchPage";

// Auto-login component
function AutoLoginWrapper() {
  const { login, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Auto-login if not already logged in
    if (!isAuthenticated) {
      // Generate a demo token and auto-login
      const demoToken = "demo-token-auto-login";
      const demoUser = {
        id: "69f10265e7f2dff1af02b50a",
        name: "Demo User",
        email: "demo@cricket.com",
      };
      login(demoUser, demoToken);
    }
  }, [isAuthenticated, login]);

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" />} />
      <Route path="/register" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/:id"
        element={
          <ProtectedRoute>
            <TeamPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/match/:id"
        element={
          <ProtectedRoute>
            <MatchPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AutoLoginWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
