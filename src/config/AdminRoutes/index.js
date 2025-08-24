import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/profile" replace />;

  return children;
};

export default AdminRoute;
