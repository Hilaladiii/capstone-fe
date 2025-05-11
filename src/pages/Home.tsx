import { BiPlay } from "react-icons/bi";
import { Button } from "../components/ui/button";
import Card from "../components/ui/card";
import HeaderLayout from "../components/layout/HeaderLayout";
import FooterLayout from "../components/layout/FooterLayout";

const mitraData = [
  {
    title: "Mitra 1",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy nibh euismod tincidunt ut laoreet.",
    imageUrl: "/mitra.png",
  },
  {
    title: "Mitra 2",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy nibh euismod tincidunt ut laoreet.",
    imageUrl: "/mitra.png",
  },
  {
    title: "Mitra 3",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy nibh euismod tincidunt ut laoreet.",
    imageUrl: "/mitra.png",
  },
  {
    title: "Mitra 4",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy nibh euismod tincidunt ut laoreet.",
    imageUrl: "/mitra.png",
  },
  {
    title: "Mitra 5",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy nibh euismod tincidunt ut laoreet.",
    imageUrl: "/mitra.png",
  },
  {
    title: "Mitra 6",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy nibh euismod tincidunt ut laoreet.",
    imageUrl: "/mitra.png",
  },
];

const announcements = [
  {
    date: "30/12/2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet.",
  },
  {
    date: "30/12/2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet.",
  },
  {
    date: "30/12/2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet.",
  },
];

const Home = () => {
  return (
    <div className="h-max flex flex-col overflow-x-hidden">
      <HeaderLayout />
      <section
        className="relativew-full bg-cover bg-center flex items-center justify-end"
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        <div className="w-[1440px] h-[905px] relative">
          <div className="w-[1440px] h-[905px] left-0 top-0 absolute bg-black/10 blur-sm" />
          <div className="w-[771px] h-4 left-[694px] top-[294px] absolute bg-slate-900 rounded-[3px]" />
          <div className="w-[536px] left-[697px] top-[350px] absolute justify-center text-black text-6xl font-semibold leading-[61.60px]">
            PRAKTIK KERJA LAPANG PRODI SI 
          </div>
          <div className="left-[700px] top-[488px] absolute text-center justify-center text-slate-800 text-xl font-semibold leading-relaxed">
            FAKULTAS ILMU KOMPUTER
          </div>
          <div className="w-[596px] h-4 left-[572px] top-[553px] absolute bg-slate-900 rounded-[3px]" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary h-96 flex flex-col items-center justify-center">
        <div className="w-full pl-20 absolute text-start text-secondary text-5xl font-bold leading-[52.80px] top-16">
          Progress Pengajuan
        </div>
        <div className="flex flex-col items-center mt-20">
          <div className="flex absolute top-54 w-[80%] md:w-[1000px] h-4 bg-white"></div>
          <div className="flex justify-between w-[80%] md:w-[1054px] mt-6 z-0">
            <div className="w-10 h-10 bg-slate-900 rounded-full border-8 border-white"></div>
            <div className="w-10 h-10 bg-slate-900 rounded-full border-8 border-white"></div>
            <div className="w-10 h-10 bg-slate-900 rounded-full border-8 border-white"></div>
            <div className="w-10 h-10 bg-secondary rounded-full border-8 border-white"></div>
          </div>
        </div>
        <div className="flex justify-between w-[80%] md:w-[1054px] mt-3">
          <div className="text-center text-white text-xl font-semibold leading-relaxed">Verifikasi Berkas</div>
          <div className="text-center text-white text-xl font-semibold leading-relaxed">Revisi Dokumen</div>
          <div className="text-center text-white text-xl font-semibold leading-relaxed">Proses TTD</div>
          <div className="text-center text-white text-xl font-semibold leading-relaxed">Sudah Dikirim</div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between px-40 py-12 bg-primary text-white">
        <div className="flex-shrink-0 mb-8">
          <h2 className="text-5xl font-semibold text-secondary mb-4">Apa itu PKL?</h2>
          <img src="/pkl.png" alt="Illustration" className="w-full max-w-[400px] rounded-lg" />
        </div>
        <div className="flex flex-col items-start md:w-2xl">
          <p className="text-lg text-gray-300 mb-6 border-2 border-secondary p-4 rounded-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Ut wisi enim ad minim veniam, quis
            nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>
          <Button variant="secondary" className="py-3 px-8">Informasi Selengkapnya <span className="ml-2 text-xl">→</span></Button>
        </div>
      </section>

      <section className="flex flex-col items-center py-12 bg-white">
        <div className="flex justify-between items-center mb-14 w-full">
          <div className="h-2 bg-gradient-to-l from-black to-white w-144" />
          <h2 className="flex text-5xl font-semibold text-secondary">Mitra FILKOM</h2>
          <div className="h-2 bg-gradient-to-r from-black to-white w-144" />
        </div>
        <div className="grid lg:grid-cols-3 w-5xl gap-8">
          {mitraData.map((mitra, index) => (
            <Card
              key={index}
              title={mitra.title}
              address={mitra.address}
              imageUrl={mitra.imageUrl}
            />
          ))}
        </div>
        <Button variant="secondary" className="mt-10 py-3 px-8">
          Lihat Semua Mitra 
          <span className="ml-2 text-base">→</span>
        </Button>
      </section>

      <section className="flex flex-col w-full h-[886px] bg-primary px-10 py-20">
        <div className="top-10 left-6 text-start mb-12 text-secondary text-5xl font-bold">
          Video Tutorial
        </div>
        <div className=" bg-zinc-600 rounded-[30px] w-full max-w-[1314px] mx-auto p-6 relative">
          <img 
            className="w-full h-auto max-w-[1271px] rounded-[30px]" 
            src="/video.png" 
            alt="Video Tutorial"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-45 p-4 rounded-full">
          <BiPlay className="text-gray-800 w-16 h-16 cursor-pointer" />
        </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center px-40 py-12 bg-primary">
        <div className="flex-shrink-0 mb-8">
          <h2 className="text-5xl text-center font-bold text-white mb-4">Prosedur PKL Instansi</h2>
          <img src="/prosedur.png" alt="Illustration" className="w-4xl" />
        </div>
      </section>

      <section className="bg-gray-900 text-black p-6 w-full mx-auto flex flex-col items-center text-start justify-center">
        <h1 className="flex text-3xl font-bold text-start text-secondary w-full mb-6 pb-4 pl-24">
          Pengumuman
        </h1>
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="bg-white w-10/11 p-5 rounded-lg mb-4 hover:bg-gray-700 transition duration-300"
          >
            <div className="text-secondary font-semibold mb-3">{announcement.date}</div>
            <div className="text-sm leading-relaxed">{announcement.content}</div>
          </div>
        ))}
        <Button variant="secondary" className="py-3 px-26">Lainnya</Button>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center w-full px-40 py-12 bg-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-4xl text-center font-semibold text-black mt-10 mb-6">Apakah anda ingin mengajukan PKL?</h2>
          <Button className="py-3 px-8 bg-green-600">Ajukan Permohonan PKL</Button>
        </div>
      </section>

      <FooterLayout />

    </div>
  )
};

export default Home;
