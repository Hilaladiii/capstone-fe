import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full max-h-screen flex justify-between overflow-hidden pr-10">
      <section className="w-240 relative flex justify-center items-center">
        <div className="size-250 bottom-52 right-48 rounded-full bg-gradient-to-b from-[#131E30] to-[#17294C] border-6 border-secondary text-white flex flex-col justify-center items-center p-4 relative">
          <div className="z-10 absolute top-2/4 left-4/12">
            <h1 className="text-4xl font-semibold mb-6">Welcome to SPASI!</h1>
            <p className="text-sm leading-relaxed max-w-lg">
              SPASI (Sistem Praktik Kerja Lapang SI) adalah aplikasi yang memfasilitasi mahasiswa dalam proses Praktik Kerja Lapangan (PKL). Aplikasi ini dirancang untuk membantu mahasiswa dalam mengelola berbagai tahapan PKL, mulai dari pendaftaran, pengajuan konsultasi, hingga pelaporan kegiatan. 
            </p>
          </div>
          <div className="absolute -bottom-30 left-36 w-64 h-64 bg-gradient-to-b from-[#17294C] to-[#131E30] bg-[top_60%] rounded-full border-t-4 border-l-2 border-r-2 border-b-0 border-secondary z-0" />
          <div className="absolute -bottom-8 left-130 w-44 h-44 bg-gradient-to-b from-[#0c1728] to-[#17294C] rounded-full border-t-0 border-l-2 border-r-2 border-b-5 border-secondary z-0" />
        </div>
      </section>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
