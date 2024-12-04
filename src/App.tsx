import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import UserDashboard from "./components/User/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute
                component={UserDashboard}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                component={AdminDashboard}
                allowedRoles={["admin"]}
              />
            }
          />
        </Routes>
        <Toaster />

      </AuthProvider>
    </Router>
  );
};

export default App;
