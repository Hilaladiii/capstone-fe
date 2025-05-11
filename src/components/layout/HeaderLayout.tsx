import { GoBellFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="list-none">
      <Link to={to} className={`${isActive ? "text-secondary" : "hover:text-secondary"}`}>
        {children}
      </Link>
    </li>
  );
};

const HeaderLayout = () => {
  return (
    <nav className="bg-primary w-full h-18 text-white px-14 py-4 flex items-center fixed z-50 justify-between">
      <img className="h-10" src="/logo-spasi.png" alt="Logo SPASI" />
      <ul className="flex space-x-32 text-[14px] font-semibold">
        <NavItem to="/home">Beranda</NavItem>
        <NavItem to="/info">Info</NavItem>
        <NavItem to="/pengajuan">Pengajuan</NavItem>
        <NavItem to="/logbook">Logbook</NavItem>
      </ul>
      <div className="flex items-center gap-4">
        <NavItem to="/notification">
          <GoBellFill className="w-7 h-7 cursor-pointer" />
        </NavItem>
        <span className="bg-secondary text-black font-semibold px-4 py-1 rounded-full text-sm">Mahasiswa</span>
        <NavItem to="/profile">
          <FaCircleUser className="w-7 h-7 cursor-pointer" />
        </NavItem>
      </div>
    </nav>
  );
};

export default HeaderLayout;
