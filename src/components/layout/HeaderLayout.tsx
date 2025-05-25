import React, { useState, useEffect } from "react";
import { GoBellFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; 
}

const NavItem = ({ to, children, onClick, className }: NavItemProps) => {
  const location = useLocation();  

  const isActive = location.pathname === to;

  return (
    <li className="list-none border-transparent">
      <Link
        to={to}
        className={`hover:text-secondary focus:outline-none ${isActive ? 'text-secondary' : 'text-white'} ${className}`} 
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

const HeaderLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 
  const location = useLocation(); 

  const isInfoPage = location.pathname === '/info/umum' || location.pathname === '/info/mitra';

  const handleClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handlePageClick = () => {
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement; 
      if (!target.closest(".info-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-primary w-full h-19 px-14 py-4 flex items-center fixed z-50 justify-between">
      <img className="h-10" src="/logo-spasi.png" alt="Logo SPASI" />
      <ul className="flex space-x-32 text-sm font-semibold">
        <NavItem to="/home">Beranda</NavItem>

        <div
          className="relative info-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavItem to="#" onClick={handleClick} className={isInfoPage ? 'text-secondary' : ''}>
            Info
          </NavItem>

          {(isDropdownOpen || isHovered) && (
            <div className="absolute w-56 bg-primary text-white text-xs rounded-md shadow-lg">
              <ul className="p-2 px-4 pt-6">
                <li>
                  <Link
                    to="/info/umum"
                    className="block px-4 py-3 hover:bg-secondary rounded-md"
                    onClick={handlePageClick} 
                  >
                    Informasi Umum
                  </Link>
                </li>
                <li className="h-[1px] w-auto bg-white"/>
                <li>
                  <Link
                    to="/info/mitra"
                    className="block px-4 py-3 hover:bg-secondary rounded-md"
                    onClick={handlePageClick} 
                  >
                    Mitra PKL
                  </Link>
                </li>
                <li className="h-[1px] w-auto bg-white"/>
                <li>
                  <Link
                    to="/info/pengumuman"
                    className="block px-4 py-3 hover:bg-secondary rounded-md"
                    onClick={handlePageClick} 
                  >
                    Pengumuman
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

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