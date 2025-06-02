import { FaInstagram } from "react-icons/fa";
import { PiGlobeBold } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";

const Footer = () => {
  const links = [
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/filkomub",
      label: "@filkomub",
    },
    {
      icon: <PiGlobeBold />,
      href: "https://filkom.ub.ac.id",
      label: "filkom.ub.ac.id",
    },
    {
      icon: <RiCustomerService2Fill />,
      href: "https://halofilkom.ub.ac.id",
      label: "halofilkom.ub.ac.id",
    },
  ];

  return (
    <div className="w-full h-70 bg-primary text-white py-12 px-20 flex justify-between text-[11px] items-center">
      <div className="flex flex-col items-center text-center gap-2 mb-4">
        <img className="my-6" src="/logo-filkom.png" alt="Logo FILKOM" />
        <div>Fakultas Ilmu Komputer (FILKOM)</div>
        <div>Universitas Brawijaya</div>
        <div>Sistem Informasi</div>
      </div>

      <div className="flex flex-col gap-4 max-w-sm">
        <div className="flex flex-col gap-2">
          <p>Narahubung Akademik</p>
          <a href="tel:+6281132257272" className="hover:underline">
            081132257272
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <p>EMAIL</p>
          <a href="mailto:kmafilkom@ub.ac.id" className="hover:underline">
            kmafilkom@ub.ac.id
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <p>Alamat</p>
          <p>
            Jl. Veteran, Ketawanggede, Lowokwaru, Kota Malang, Jawa Timur,
            Indonesia - 65145
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        {links.map(({ icon, href, label }, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="text-2xl">{icon}</div>
            <a
              href={href}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          </div>
        ))}
        <div className="leading-snug mt-6">
          Copyright © 2018 PSIK FILKOM UB. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
