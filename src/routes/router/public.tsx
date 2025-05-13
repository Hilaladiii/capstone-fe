import { RouteObject } from "react-router-dom";
import RegisterStudent from "../../pages/register/RegisterStudent";
import AuthLayout from "../../components/layout/AuthLayout";
import Login from "../../pages/Login";

export const publicRoute: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "sign-up",
        element: (
          <AuthLayout>
            <RegisterStudent />
          </AuthLayout>
        ),
      },
      {
        path: "sign-in",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
    ],
  },
];
