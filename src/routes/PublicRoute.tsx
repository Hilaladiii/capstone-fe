import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../common/hooks/useAuth";
import { Roles } from "../common/types/user.type";

const roleRedirect: Partial<Record<Roles, string>> = {
  [Roles.STUDENT]: "/home",
  [Roles.ACADEMIC]: "/dashborad/academic",
  [Roles.LECTURER]: "/dashborad/lecturer",
};

export const PublicRoute = () => {
  const { userClaims, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    const matchRole = userClaims?.roles.find((role) => roleRedirect[role]);
    return <Navigate to={roleRedirect[matchRole!]!} replace />;
  }

  return <Outlet />;
};
