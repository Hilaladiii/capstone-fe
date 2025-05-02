import { RouteObject } from "react-router-dom";
import RegisterLecturer from "../components/pages/register/RegisterLecturer";
import RegisterAcademic from "../components/pages/register/RegisterAcademic";
import RegisterStudent from "../components/pages/register/RegisterStudent";
import Login from "../components/pages/Login";
import Home from "../components/pages/Home";
import Info from "../components/pages/Info";
import Pengajuan from "../components/pages/Pengajuan";
import Logbook from "../components/pages/Logbook";
import Notification from "../components/pages/Notification";
import Profile from "../components/pages/Profile";

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: (
        <RegisterStudent />
    ),
  },
  {
    path: '/register/academic',
    element: (
        <RegisterAcademic />
    ),
  },
  {
    path: '/register/lecturer',
    element: (
        <RegisterLecturer />
    ),
  },
  {
    path: '/home',
    element: (
        <Home />
    ),
  },
  {
    path: '/home/info',
    element: (
        <Info />
    ),
  },
  {
    path: '/home/pengajuan',
    element: (
        <Pengajuan />
    ),
  },
  {
    path: '/home/logbook',
    element: (
        <Logbook />
    ),
  },
  {
    path: '/home/notification',
    element: (
        <Notification />
    ),
  },
  {
    path: 'home/profile',
    element: (
        <Profile />
    ),
  },
];

export default routes;
