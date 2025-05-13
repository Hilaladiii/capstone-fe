import { RouteObject } from "react-router-dom";
import Home from "../../pages/Home";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <Home/>,
  },
];
