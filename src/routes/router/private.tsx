import { RouteObject } from "react-router-dom";
import Logbook from "../../pages/logbook/index";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <div>home page</div>,
  },
  {
    path: "/logbook",
    element: <Logbook />,
  },
];
