import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/Home";
import Info from "../../pages/info";
import ListMitra from "../../pages/info/ListMitra";
import Pengajuan from "../../pages/Pengajuan";
import Logbook from "../../pages/Logbook";
import Notification from "../../pages/Notification";
import Profile from "../../pages/Profile";
import AnnouncementDetail from "../../pages/AnnouncementDetail";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/info/umum",
    element: <Info/>,
  },
  {
    path: "/info/mitra",
    element: <ListMitra/>,
  },
  {
    path: "/pengajuan",
    element: <Pengajuan/>,
  },
  {
    path: "/logbook",
    element: <Logbook/>,
  },
  {
    path: "/notification",
    element: <Notification/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/pengumuman/:id",
    element: <AnnouncementDetail/>,
  },
];
