import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Feed from "./pages/Feed";
import { AuthProvider, useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/Feed"
            element={
              <PrivateRoute>
             
                <Feed></Feed>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
