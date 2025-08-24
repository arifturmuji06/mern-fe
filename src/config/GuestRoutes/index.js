import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "admin") return <Navigate to="/remunerasi" replace />;
    if (user.role === "karyawan") return <Navigate to="/profile" replace />;
  }

  return children;
};

export default GuestRoute;
