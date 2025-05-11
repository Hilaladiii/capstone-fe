import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../common/hooks/useAuth";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
};
