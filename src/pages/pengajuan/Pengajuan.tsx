import FooterLayout from "../../components/layout/FooterLayout";
import HeaderLayout from "../../components/layout/HeaderLayout";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom"; 

const Pengajuan = () => {
  const sections = [
    {
      title: "PKL Instansi",
      description:
        "Pelaksanaan tipe PKL Instansi diwajibkan dalam bekerja penuh atau paruh waktu dengan status mahasiswa praktisi di suatu perusahaan/industri atau lembaga non-perusahaan/industri dalam jangka waktu tertentu sesuai peraturan/ketentuan. Jika ditinjau dari spesifik lokasinya, PKL tipe ini dapat berupa Perusahaan/Industri atau Non-Perusahaan/Industri.",
      buttonText: "Ajukan Permohonan",
      link: "/pkl-instansi",
      image: "/image1.png",
    },
    {
      title: "PKL Lomba",
      description:
        "Pelaksanaan tipe Kompetisi Mahasiswa merupakan sebuah aktivitas (turnamen, kompetisi, liga, Olimpiade, atau kontes) yang diselenggarakan oleh instansi pemerintah atau swasta baik dalam maupun luar negeri yang ditujukan untuk mendorong inovasi dan kreativitas dari para pesertanya.",
      buttonText: "Ajukan Permohonan",
      link: "/pkl-lomba",
      image: "/image2.png",
    },
    {
      title: "Perpanjangan Masa Pelaksanaan PKL",
      description:
        "Formulir ini ditujukan untuk Mahasiswa atau Kelompok Mahasiswa yang sedang melaksanakan kegiatan Praktik Kerja Lapangan (PKL), yang akan mengajukan tambahan waktu dalam menyelesaikan penyusunan laporan setelah semua kegiatan di Lapangan selesai.",
      buttonText: "Ajukan Perpanjangan",
      link: "/perpanjangan-pkl",
      image: "/image3.png",
    },
    {
      title: "Pembatalan Pelaksanaan PKL",
      description: "Formulir ini ditujukan untuk Mahasiswa atau Kelompok Mahasiswa melakukan pembatalan kegiatan Praktik Kerja Lapangan (PKL) yang sudah berlangsung atau masih dalam tahap pengajuan.",
      buttonText: "Ajukan Pembatalan",
      link: "/pembatalan-pkl",
      image: "/image4.png",
    },
  ];

  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <div className="text-white pt-30 py-16 px-10 justify-center items-center bg-primary w-full">
        {sections.map((section, index) => (
          <div key={index} className="mb-12 flex flex-col justify-center items-center">
            <div className="self-start px-30 mb-6">
              <h2 className="text-xl font-semibold text-start">{section.title}</h2>
            </div>
            <div className="bg-secondary w-full max-w-6xl rounded-3xl p-6 flex justify-center items-center gap-6 relative mx-auto">
              <img src={section.image} alt={section.title} className="w-40 h-40 object-cover rounded-2xl" />
              <div className="flex flex-col justify-center text-white items-center relative z-10">
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-black opacity-10 rounded-2xl"></div>
                  <p className="text-xs mb-4 text-black font-semibold relative z-20 p-4 bg-transparent rounded-lg">{section.description}</p>
                </div>
                <Link to={section.link}>
                  <Button variant="primary" className="w-fit text-sm font-semibold px-14 py-2 mt-4 relative z-20">
                    {section.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FooterLayout />
    </main>
  );
};

export default Pengajuan;
