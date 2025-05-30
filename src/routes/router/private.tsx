import { RouteObject } from "react-router-dom";
import DashboardAcademic from "../../pages/academic/DashboardAcademic";
import SidebarAcademicLayout from "../../components/layout/SidebarAcademicLayout";
import AnnouncementAdmin from "../../pages/academic/AnnouncementAdmin";
import PartnerAdmin from "../../pages/academic/PartnerAdmin";
import ProfileAcademic from "../../pages/academic/profile/ProfileAcademic";

export const privateRoute: RouteObject[] = [
  {
    path: "/home",
    element: <div>home page</div>,
  },
  {
    path: "",
    Component: SidebarAcademicLayout,
    children: [
      {
        path: "/dashboard/academic",
        element: <DashboardAcademic />,
      },
      {
        path: "/pengumuman",
        element: <AnnouncementAdmin />,
      },
      {
        path: "/mitra-pkl",
        element: <PartnerAdmin />,
      },
      {
        path: "/profile",
        element: <ProfileAcademic />,
      },
    ],
  },
];
