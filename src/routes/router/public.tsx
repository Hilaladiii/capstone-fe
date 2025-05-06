import { RouteObject } from "react-router-dom";
import RegisterStudent from "../../pages/register/RegisterStudent";
import AuthLayout from "../../components/layout/AuthLayout";

export const publicRoute: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <RegisterStudent />
          </AuthLayout>
        ),
      },
    ],
  },
];
