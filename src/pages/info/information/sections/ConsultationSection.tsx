import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useConsultation } from "../../../../common/hooks/useConsultation";
import SuccessNotification from "../../../../components/ui/successNotification";
import { z } from "zod";

const consultationSchema = z.object({
  fullname: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  nim: z.string().min(1, { message: "NIM wajib diisi" }),
  agencyName: z.string().min(1, { message: "Nama instansi wajib diisi" }),
  position: z.string().min(1, { message: "Posisi yang dilamar wajib diisi" }),
  activityDescription: z.string().min(1, { message: "Deskripsi aktivitas wajib diisi" }),
});

const ConsultationSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(consultationSchema), 
  });

  const { mutate } = useConsultation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof consultationSchema>> = (data) => { 
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(true); 
        reset();
      },
      onError: () => {
        setIsModalOpen(false); 
      },
    });
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <section className="flex flex-col py-20 bg-white w-full px-20">
      <div className="flex items-center w-full">
        <h2 className="text-base mb-10 font-semibold text-center text-white bg-primary rounded-lg w-1/3 h-13 flex justify-center items-center px-6">
          Ajukan Konsultasi Profesi PKL kepada KPS
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-2 px-4"
      >
        <div className="flex items-center w-full space-x-4">
          <label htmlFor="fullname" className="w-40 text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <div className="flex-1">
            <Input
              id="fullname"
              name="fullname"
              register={register}
              label=""
              placeholder="Masukkan nama lengkap"
              className="w-full min-w-2xl bg-support-2"
              errors={errors.fullname}
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="nim" className="w-40 text-sm font-medium text-gray-700">
            NIM
          </label>
          <div className="flex-1">
            <Input
              id="nim"
              name="nim"
              register={register}
              label=""
              placeholder="Masukkan NIM"
              className="w-full min-w-2xl bg-support-2"
              errors={errors.nim}
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="agencyName" className="w-40 text-sm font-medium text-black">
            Nama Instansi
          </label>
          <div className="flex-1">
            <Input
              id="agencyName"
              name="agencyName"
              register={register}
              label=""
              placeholder="Masukkan nama instansi"
              className="w-full min-w-2xl bg-support-2"
              errors={errors.agencyName}
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="position" className="w-40 text-sm font-medium text-gray-700">
            Posisi yang dilamar
          </label>
          <div className="flex-1">
            <Input
              id="position"
              name="position"
              register={register}
              label=""
              placeholder="Masukkan nama posisi"
              className="w-full min-w-2xl bg-support-2"
              errors={errors.position}
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4">
          <label htmlFor="activityDescription" className="w-40 text-sm font-medium text-gray-700">
            Deskripsi Aktivitas
          </label>
          <div className="flex-1">
            <Input
              id="activityDescription"
              name="activityDescription"
              register={register}
              label=""
              placeholder="Masukkan deskripsi aktivitas"
              className="w-full min-w-2xl h-20 bg-support-2"
              errors={errors.activityDescription}
            />
          </div>
        </div>
        <div className="px-44 mt-4">
          <Button variant="secondary" className="py-3 px-14 text-sm">
            Submit
          </Button>
        </div>
      </form>

      <SuccessNotification 
        isOpen={isModalOpen}
        title="Anda berhasil submit !"
        message="Silahkan menunggu jawaban kps"
        onClose={closeModal} 
      />
    </section>
  );
};

export default ConsultationSection;
