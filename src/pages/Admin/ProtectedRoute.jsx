import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { login, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return login ? children : <Navigate to="/login" />;
};
