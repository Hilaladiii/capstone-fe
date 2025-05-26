import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/Home";
import Information from "../../pages/info/information/Information";
import ListMitra from "../../pages/info/partner/PartnerList";
import Pengajuan from "../../pages/Pengajuan";
import Logbook from "../../pages/Logbook";
import Notification from "../../pages/Notification";
import Profile from "../../pages/Profile";
import AnnouncementDetail from "../../pages/info/announcement/AnnouncementDetail";
import AnnouncementList from "../../pages/info/announcement/AnnouncementList";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/info/umum",
    element: <Information />,
  },
  {
    path: "/info/mitra",
    element: <ListMitra />,
  },
  {
    path: "/pengajuan",
    element: <Pengajuan />,
  },
  {
    path: "/logbook",
    element: <Logbook />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/pengumuman/:id",
    element: <AnnouncementDetail />,
  },
  {
    path: "/info/pengumuman",
    element: <AnnouncementList />,
  },
];
