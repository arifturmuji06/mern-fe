import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const KaryawanRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "karyawan") return <Navigate to="/" replace />;

  return children;
};

export default KaryawanRoute;
