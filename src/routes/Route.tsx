import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { publicRoute } from "./router/public";
import { PrivateRoute } from "./PrivateRoute";
import { privateRoute } from "./router/private";

const routes = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: publicRoute,
  },
  {
    element: <PrivateRoute />,
    children: privateRoute,
  },
]);

export default routes;
