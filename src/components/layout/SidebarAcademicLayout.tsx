import { NavLink } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { IoMegaphoneOutline } from "react-icons/io5";
import { BiBuildings } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";

interface NavigationItemProps {
  icon?: React.ReactNode;
  label: string;
  to: string;
  className?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  to,
  className = "",
}) => {
  const baseStyles = "flex w-full border border-black border-solid";
  const activeStyles = "bg-extra-10";
  const inactiveStyles = "bg-secondary";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseStyles} ${isActive ? activeStyles : inactiveStyles} ${className} focus:outline-none`
      }
    >
      <div className="flex items-center w-full h-15">
        {icon && <div className="w-12 text-3xl">{icon}</div>}
        <span className="text-white text-base font-semibold">{label}</span>
      </div>
    </NavLink>
  );
};

const SidebarAcademicLayout = () => {
  return (
    <header className="flex flex-row text-base font-semibold text-white max-w-full">
      <nav className="flex flex-col pt-12 w-[293px] bg-slate-900 min-h-screen">
        <div className="flex items-center justify-center">
          <img
            src="/logo-spasi.png"
            alt="Logo"
            className="object-contain w-[141px]"
          />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <NavigationItem
            icon={<RiDashboardFill />}
            label="Dashboard"
            to="/dashboard/academic"
            className="gap-6 px-4"
          />

          <NavigationItem
            icon={<IoMegaphoneOutline />}
            label="Pengumuman"
            to="/pengumuman"
            className="gap-6 px-4"
          />

          <NavigationItem
            icon={<BiBuildings />}
            label="Mitra PKL"
            to="/mitra-pkl"
            className="gap-6 px-4"
          />
        </div>
      </nav>

      <div className="absolute top-4 right-4 flex gap-5 items-center py-4 px-10">
        <span className="text-white text-sm font-semibold bg-secondary rounded-3xl py-2 px-8">
          Akademik
        </span>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-extra-10" : "text-primary"
          }
        >
          <FaUserCircle className="text-4xl" />
        </NavLink>
      </div>

      <Outlet />
    </header>
  );
};

export default SidebarAcademicLayout;
