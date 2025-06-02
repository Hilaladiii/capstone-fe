import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/Home";
import Information from "../../pages/info/information/Information";
import ListMitra from "../../pages/info/partner/PartnerList";
import Logbook from "../../pages/logbook/index";
import Notification from "../../pages/Notification/NotificationList";
import Profile from "../../pages/profile/Profile";
import AnnouncementDetail from "../../pages/info/announcement/AnnouncementDetail";
import AnnouncementList from "../../pages/info/announcement/AnnouncementList";
import CancellationRequestForm from "../../pages/application/form/CancellationRequestForm";
import CompanyApplicationForm from "../../pages/application/form/CompanyApplicationForm";
import CompetitionApplicationForm from "../../pages/application/form/CompetitionApplicationForm";
import ExtensionRequestForm from "../../pages/application/form/ExtensionRequestForm";
import Pengajuan from "../../pages/application/Pengajuan";
import SidebarAcademicLayout from "../../components/layout/SidebarAcademicLayout";
import AnnouncementAdmin from "../../pages/academic/AnnouncementAdmin";
import PartnerAdmin from "../../pages/academic/PartnerAdmin";
import ProfileAcademic from "../../pages/academic/profile/ProfileAcademic";
import MainLayout from "../../components/layout/MainLayout";
import RoleGuard from "../RoleGuard";
import { Roles } from "../../common/types/user.type";
import ApplicationAcademic from "../../pages/academic/ApplicationAcademic/ApplicationAcademic";

export const privateRoute: RouteObject[] = [
  {
    Component: MainLayout,
    children: [
      {
        element: <RoleGuard allowedRoles={[Roles.STUDENT]} />,
        children: [
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
          {
            path: "/pembatalan-pkl",
            element: <CancellationRequestForm />,
          },
          {
            path: "/pkl-instansi",
            element: <CompanyApplicationForm />,
          },
          {
            path: "/pkl-lomba",
            element: <CompetitionApplicationForm />,
          },
          {
            path: "/perpanjangan-pkl",
            element: <ExtensionRequestForm />,
          },
        ],
      },
    ],
  },
  {
    path: "",
    Component: SidebarAcademicLayout,
    children: [
      {
        path: "/dashboard/academic",
        element: <ApplicationAcademic />,
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
