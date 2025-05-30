import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/Home";
import Information from "../../pages/info/information/Information";
import ListMitra from "../../pages/info/partner/PartnerList";
import Logbook from "../../pages/Logbook";
import Profile from "../../pages/Profile";
import AnnouncementDetail from "../../pages/info/announcement/AnnouncementDetail";
import AnnouncementList from "../../pages/info/announcement/AnnouncementList";
import CancellationRequestForm from "../../pages/application/form/CancellationRequestForm";
import CompanyApplicationForm from "../../pages/application/form/CompanyApplicationForm";
import CompetitionApplicationForm from "../../pages/application/form/CompetitionApplicationForm";
import ExtensionRequestForm from "../../pages/application/form/ExtensionRequestForm";
import Pengajuan from "../../pages/application/Pengajuan";

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
];
