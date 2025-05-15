import { RouteObject } from "react-router-dom";
import Home from "../../pages/Home";
import Info from "../../pages/info";
import ListMitra from "../../pages/info/ListMitra";
import Pengajuan from "../../pages/Pengajuan";
import Notification from "../../pages/Notification/NotificationList";
import Profile from "../../pages/Profile";
import AnnouncementList from "../../pages/pengumuman/AnnouncementList";
import AnnouncementDetail from "../../pages/pengumuman/AnnouncementDetail";
import UpdateLogbookForm from "../../pages/Logbook";
import NotificationDetail from "../../pages/Notification/NotificationDetail";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/info/umum",
    element: <Info />,
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
    element: <UpdateLogbookForm />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/detailnotifikasi/:id",
    element: <NotificationDetail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/pengumuman",
    element: <AnnouncementList />,
  },
  {
    path: "/detailpengumuman/:id",
    element: <AnnouncementDetail />,
  },
];
