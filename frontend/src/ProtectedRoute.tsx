import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useAuth();
  return !isLoading && !isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
