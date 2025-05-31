import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const PklSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/info");
  };

  return (
    <section className="flex flex-row items-center justify-between px-20 py-12 bg-primary text-white">
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-4">Apa itu PKL?</h2>
        <img src="/pkl.png" alt="Illustration" className="w-full max-w-[300px] rounded-lg" />
      </div>
      <div className="flex flex-col items-start w-233">
        <div className="border-2 border-secondary p-6 rounded-lg h-52 mb-4">
          <p className="text-sm text-justify text-gray-300 mb-6">
            PKL adalah suatu implementasi yang menyinkronkan antara pendidikan akademik kampus dan penguasaan keahlian hardskill dan softskill mahasiswa dalam bentuk interaksi langsung dengan masyarakat atau dunia kerja. Sehingga dengan PKL mahasiswa mendapatkan pengalaman nyata yang tidak diajarkan didalam kampus serta mampu meningkatkan kompetensi dan keahlian yang relevan. PKL dilakukan oleh mahasiswa atau sekelompok mahasiswa (maksimal 3 mahasiswa) dalam satu jurusan dan dalam sebuah kelompok PKL diperbolehkan setiap anggota memiliki keminatan yang berbeda.
          </p>
        </div>
        <Button variant="secondary" className="py-3 px-8 text-sm font-semibold cursor-pointer" onClick={handleButtonClick}>
          Informasi Selengkapnya <span className="ml-2 text-sm">→</span>
        </Button>
      </div>
    </section>
  );
};

export default PklSection;
