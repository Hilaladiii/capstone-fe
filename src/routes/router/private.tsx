import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/Home";
import AnnouncementDetail from "../../pages/AnnouncementDetail";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/pengumuman/:id",
    element: <AnnouncementDetail/>,
  },
];
