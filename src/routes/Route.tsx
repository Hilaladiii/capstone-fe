import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { publicRoute } from "./router/public";

const routes = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: publicRoute,
  },
]);

export default routes;
