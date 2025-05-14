const PklSection = () => {
  const PklTypeCard = ({ title, description }: { title: string, description: string }) => (
    <div className="border-secondary border-4 p-6 rounded-lg w-1/2 text-justify">
      <h3 className="font-semibold text-2xl text-center mb-6">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );

  return (
    <section className="flex flex-col min-h-screen bg-primary text-white py-10 px-5 pt-32">
      <div className="flex text-3xl font-bold text-start pl-18 mb-6">Apa itu PKL?</div>
      <div className="border-secondary border-4 text-white p-6 rounded-lg mx-18 mb-8">
        <p className="text-sm text-justify leading-relaxed">
          PKL adalah suatu implementasi yang menyinkronkan antara pendidikan akademik kampus dan penguasaan keahlian hardskill dan softskill mahasiswa dalam bentuk interaksi langsung dengan masyarakat atau dunia kerja. 
          Sehingga dengan PKL mahasiswa mendapatkan pengalaman nyata yang tidak diajarkan didalam kampus serta mampu meningkatkan kompetensi dan keahlian yang relevan. PKL dilakukan oleh mahasiswa atau sekelompok mahasiswa (maksimal 3 mahasiswa) dalam satu
          jurusan dan dalam sebuah kelompok PKL diperbolehkan setiap anggota memiliki keminatan yang berbeda.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">Klasifikasi Tipe PKL</h2>
      <div className="flex justify-center mx-18 space-x-10">
        <PklTypeCard 
          title="Praktik Lapangan / Magang" 
          description="Pelaksanaan tipe Praktik Lapangan dilakukan dengan bekerja penuh atau paruh waktu sebagai mahasiswa praktik di suatu perusahaan, industri, atau lembaga non-industri. Sementara itu, magang dilakukan dengan bekerja penuh atau paruh waktu dengan status sebagai pegawai magang."
        />
        <PklTypeCard 
          title="Kompetisi Mahasiswa" 
          description="Pelaksanaan tipe Kompetisi Mahasiswa adalah sebuah aktivitas (turnamen, kompetisi, liga, Olimpiade, atau kontes) yang diselenggarakan oleh instansi pemerintah atau swasta baik dalam maupun luar negeri. Beberapa jenis lomba dapat disetarakan sebagai pengganti tiga sks aktivitas PKL dengan beberapa syarat dan ketentuan PKL."
        />
      </div>
    </section>
  );
};

export default PklSection;
