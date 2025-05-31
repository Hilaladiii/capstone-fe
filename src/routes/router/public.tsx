import { RouteObject } from "react-router-dom";
import RegisterStudent from "../../pages/register/RegisterStudent";
import AuthLayout from "../../components/layout/AuthLayout";
import RegisterAcademic from "../../pages/register/RegisterAcademic";
import RegisterLecturer from "../../pages/register/RegisterLecturer";
import Login from "../../pages/login/Login";
import AdminLogin from "../../pages/login/LoginAdmin";

export const publicRoute: RouteObject[] = [
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "sign-up",
        element: <RegisterStudent />,
      },
            {
        path: "sign-up-academic",
        element: <RegisterAcademic />,
      },
      {
        path: "sign-up-lecturer",
        element: <RegisterLecturer />,
      },
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "admin/sign-in",
        element: <AdminLogin />,
      },
    ],
  },
];
