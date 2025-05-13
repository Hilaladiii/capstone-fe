const HeroSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center flex items-center justify-end"
      style={{
        backgroundImage: `url('/hero.png')`,
      }}
    >
      <div className="relative w-full h-lvh">
        <div className="absolute inset-0 bg-black opacity-10 blur-sm" />
        <div className="absolute left-[694px] top-[270px] w-[771px] h-4 bg-slate-900 rounded" />
        <h1 className="absolute left-[697px] top-[320px] text-black text-5xl w-1/3 font-semibold leading-[61.60px]">
          PRAKTIK KERJA LAPANG PRODI SI
        </h1>
        <h2 className="absolute left-[700px] top-[460px] text-center text-slate-800 text-xl font-semibold leading-relaxed">
          FAKULTAS ILMU KOMPUTER
        </h2>
        <div className="absolute left-[586px] top-[530px] w-[596px] h-4 bg-slate-900 rounded" />
      </div>
    </section>
  );
};

export default HeroSection;
