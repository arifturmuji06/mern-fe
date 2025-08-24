import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // pakai context, bukan cuma token

  if (loading) return <div>Loading...</div>; // tampilkan loader/spinner kalau masih loading

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
