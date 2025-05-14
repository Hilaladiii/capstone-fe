import { useState} from "react";
import { requestConsultation } from "../../../services/consultation.service";
import { useAuth } from "../../../common/hooks/useAuth";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input"; // Pastikan import komponen Input
import { useForm, SubmitHandler} from "react-hook-form"; // Import react-hook-form

interface ConsultationFormData {
  fullname: string;
  nim: string;
  agencyName: string;
  position: string;
  activityDescription: string;
}

const ConsultationSection = () => {
  const { token } = useAuth();
  const { register, handleSubmit} = useForm<ConsultationFormData>(); // Inisialisasi react-hook-form dengan tipe form data
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ConsultationFormData> = async (formData) => { // Menggunakan SubmitHandler dengan tipe data form yang telah didefinisikan
    if (!token) {
      setStatusMessage("Anda belum login.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestConsultation(formData, token);
      setStatusMessage("Konsultasi berhasil dikirim.");
      console.log(response);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setStatusMessage("Terjadi kesalahan, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col py-20 bg-white w-full items-center">
      <div className="flex items-center w-full pl-20">

        <h2 className="text-base mb-10 font-semibold text-center text-white bg-primary rounded-lg w-1/3 h-14 flex justify-center items-center px-6">
        Ajukan Konsultasi Profesi PKL kepada KPS
      </h2>
      </div>


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-2xl space-y-6 px-4"
      >
        <div className="flex items-center max-w-screen space-x-4">
          <label htmlFor="fullname" className="w-40 text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <div className="flex-1">
            <Input
              type="text"
              id="fullname"
              name="fullname"
              register={register}
              required
              label=""
              placeholder="Masukkan nama lengkap"
              className="w-full bg-support2"
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="nim" className="w-40 text-sm font-medium text-gray-700">
            NIM
          </label>
          <div className="flex-1">
            <Input
              type="text"
              id="nim"
              name="nim"
              register={register}
              required
              label=""
              placeholder="Masukkan NIM"
              className="w-full bg-support2"
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="agencyName" className="w-40 text-sm font-medium text-black">
            Nama Instansi
          </label>
          <div className="flex-1">
            <Input
              type="text"
              id="agencyName"
              name="agencyName"
              register={register}
              required
              label=""
              placeholder="Masukkan nama instansi"
              className="w-full bg-support2"
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="position" className="w-40 text-sm font-medium text-gray-700">
            Posisi yang dilamar
          </label>
          <div className="flex-1">
            <Input
              type="text"
              id="position"
              name="position"
              register={register}
              required
              label=""
              placeholder="Masukkan nama posisi"
              className="w-full bg-support2"
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="activityDescription" className="w-40 text-sm font-medium text-gray-700">
            Deskripsi aktivitas
          </label>
          <div className="flex-1">
            <Input
              type="text"
              id="activityDescription"
              name="activityDescription"
              register={register}
              required
              label=""
              placeholder="Masukkan deskripsi aktifitas"
              className="w-full bg-support2"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="secondary"
            className={`py-3 px-8 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Mengirim..." : "Kirim Konsultasi"}
          </Button>
        </div>
      </form>

      {statusMessage && (
        <div
          className={`mt-4 text-center text-sm ${
            statusMessage.includes("berhasil") ? "text-green-500" : "text-red-500"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </section>

  );
};

export default ConsultationSection;
