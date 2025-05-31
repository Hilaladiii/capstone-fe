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
        <div className="absolute left-[694px] top-[230px] w-[772px] h-4 bg-slate-900" />
        <h1 className="absolute left-[697px] top-[290px] text-black text-[40px] w-1/4 font-semibold">
          PRAKTIK KERJA LAPANG PRODI SI
        </h1>
        <h2 className="absolute left-[700px] top-[420px] text-center text-slate-800 text-base font-semibold">
          FAKULTAS ILMU KOMPUTER
        </h2>
        <div className="absolute left-[586px] top-[490px] w-[596px] h-4 bg-slate-900" />
      </div>
    </section>
  );
};

export default HeroSection;
