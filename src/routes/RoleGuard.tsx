import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../common/hooks/useAuth";
import { Roles } from "../common/types/user.type";

const RoleGuard = ({ allowedRoles }: { allowedRoles: Roles[] }) => {
  const { userClaims } = useAuth();

  const roleRedirect: Partial<Record<Roles, string>> = {
    [Roles.STUDENT]: "/home",
    [Roles.ACADEMIC]: "/dashboard/academic",
    [Roles.LECTURER]: "/dashborad/lecturer",
  };

  if (!allowedRoles.some((role) => userClaims.roles!.includes(role))) {
    const matchRole = userClaims!.roles.find((role) => roleRedirect[role]);
    return <Navigate to={roleRedirect[matchRole!]!} replace />;
  }
  return <Outlet />;
};

export default RoleGuard;
