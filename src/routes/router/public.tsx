import { RouteObject } from "react-router-dom";
import RegisterStudent from "../../pages/register/RegisterStudent";
import AuthLayout from "../../components/layout/AuthLayout";
import Login from "../../pages/Login";

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
        path: "sign-in",
        element: <Login />,
      },
    ],
  },
];
