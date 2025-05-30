import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { FileUpload } from "../../../components/ui/file-upload";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";
import { useRequestCompetitionApplication } from "../../../common/hooks/useInsternship";
import { z } from "zod";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import FooterLayout from "../../../components/layout/FooterLayout";
import SuccessNotification from "../../../components/ui/successNotification";

const competitionApplicationSchema = z.object({
  names: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  nims: z.string().min(1, { message: "NIM wajib diisi" }),
  emails: z.string().min(1, { message: "Email wajib diisi" }),
  phoneNumber: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  isGroup: z.boolean(),
  totalSks: z.string().min(1, { message: "Total SKS wajib diisi" }),
  competitionName: z.string().min(1, { message: "Nama kompetisi wajib diisi" }),
  competitionSupervisor: z.string().min(1, { message: "Supervisor kompetisi wajib diisi" }),
  competitionCategory: z.string().min(1, { message: "Kategori kompetisi wajib diisi" }),
  competitionOrganizer: z.string().min(1, { message: "Penyelenggara kompetisi wajib diisi" }),
  competitionInformation: z.string().min(1, { message: "Informasi kompetisi wajib diisi" }),
  competitionLevel: z.string().min(1, { message: "Tingkat kompetisi wajib diisi" }),
  competitionWinner: z.string().min(1, { message: "Pemenang kompetisi wajib diisi" }),
  competitionProduct: z.string().min(1, { message: "Produk kompetisi wajib diisi" }),
  competitionStartDate: z.string().min(1, { message: "Tanggal mulai kompetisi wajib diisi" }),
  competitionFinishDate: z.string().min(1, { message: "Tanggal selesai kompetisi wajib diisi" }),
  studyResultCardFile: z.any().optional(),
  proposalCompetitionSertificationFile: z.any().optional(),
}).refine((data) => {
  if (data.isGroup) {
    const namesArray = data.names.split('\n').filter(name => name.trim() !== '');
    const nimsArray = data.nims.split('\n').filter(nim => nim.trim() !== '');
    const emailsArray = data.emails.split('\n').filter(email => email.trim() !== '');

    if (namesArray.length < 2 || namesArray.length > 3) {
      return false;
    }

    return namesArray.length === nimsArray.length && 
           nimsArray.length === emailsArray.length &&
           emailsArray.every(email => email.includes('@student.ub.ac.id'));
  } else {
    const hasMultipleNames = data.names.includes('\n');
    const hasMultipleNims = data.nims.includes('\n');
    const hasMultipleEmails = data.emails.includes('\n');
    
    return !hasMultipleNames && !hasMultipleNims && !hasMultipleEmails &&
           data.emails.includes('@student.ub.ac.id');
  }
}, {
  message: "Data tidak valid. Untuk kelompok: masukkan 2-3 anggota dengan jumlah yang sama. Untuk individu: hanya satu data per field. Email harus menggunakan domain @student.ub.ac.id",
  path: ["isGroup"],
});

type CompetitionApplicationFormData = z.infer<typeof competitionApplicationSchema>;

const CompetitionApplicationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CompetitionApplicationFormData>({
    resolver: zodResolver(competitionApplicationSchema),
  });

  const { mutate: requestCompetitionApplication } = useRequestCompetitionApplication();
  const [fileError, setFileError] = useState<string>("");
  const [proposalFileError, setProposalFileError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const studyResultCardFile = watch("studyResultCardFile") as File;
  const proposalCompetitionSertificationFile = watch("proposalCompetitionSertificationFile") as File;
  const isGroupSelected = watch("isGroup") || false;

  const onSubmit: SubmitHandler<CompetitionApplicationFormData> = (data) => {
    console.log("onSubmit called!");
    console.log("Form data:", data);

    if (!studyResultCardFile) {
      setFileError("Kartu Hasil Studi wajib diupload");
      return;
    }

    if (!proposalCompetitionSertificationFile) {
      setProposalFileError("Proposal/Sertifikat Kompetisi wajib diupload");
      return;
    }

    let formattedData;
    
    if (data.isGroup) {
      const namesArray = data.names.split('\n').filter(name => name.trim() !== '');
      const nimsArray = data.nims.split('\n').filter(nim => nim.trim() !== '');
      const emailsArray = data.emails.split('\n').filter(email => email.trim() !== '');
      const totalSksArray = data.totalSks.split('\n').filter(sks => sks.trim() !== '');

      formattedData = {
        name: namesArray.join(","),
        nim: nimsArray.join(","),
        email: emailsArray.join(","),
        phoneNumber: data.phoneNumber,
        isGroup: data.isGroup,
        totalSks: totalSksArray.length > 1 ? totalSksArray.join(",") : data.totalSks,
        competitionName: data.competitionName,
        competitionSupervisor: data.competitionSupervisor,
        competitionCategory: data.competitionCategory,
        competitionOrganizer: data.competitionOrganizer,
        competitionInformation: data.competitionInformation,
        competitionLevel: data.competitionLevel,
        competitionWinner: data.competitionWinner,
        competitionProduct: data.competitionProduct,
        competitionStartDate: new Date(data.competitionStartDate).toISOString(),
        competitionFinishDate: new Date(data.competitionFinishDate).toISOString(),
        studyResultCardFile: studyResultCardFile,
        proposalCompetitionSertificationFile: proposalCompetitionSertificationFile,
      };
    } else {
      formattedData = {
        name: data.names,
        nim: data.nims,
        email: data.emails,
        phoneNumber: data.phoneNumber,
        isGroup: data.isGroup,
        totalSks: data.totalSks,
        competitionName: data.competitionName,
        competitionSupervisor: data.competitionSupervisor,
        competitionCategory: data.competitionCategory,
        competitionOrganizer: data.competitionOrganizer,
        competitionInformation: data.competitionInformation,
        competitionLevel: data.competitionLevel,
        competitionWinner: data.competitionWinner,
        competitionProduct: data.competitionProduct,
        competitionStartDate: new Date(data.competitionStartDate).toISOString(),
        competitionFinishDate: new Date(data.competitionFinishDate).toISOString(),
        studyResultCardFile: studyResultCardFile,
        proposalCompetitionSertificationFile: proposalCompetitionSertificationFile,
      };
    }

    console.log("Submission Data: ", formattedData);

    requestCompetitionApplication(formattedData, {
      onSuccess: () => {
        toast.success("Pengajuan berhasil disubmit!");
        setShowSuccessModal(true);
        reset();
        setFileError("");
        setProposalFileError("");
      },
      onError: (error) => {
        console.error("Error:", error);
        toast.error("Error submitting request");
      },
    });
  };

  return (
    <main className="flex flex-col w-full">
      <HeaderLayout />
      <h2 className="text-sm w-fit ml-40 font-semibold mt-26 mb-6 bg-primary text-white rounded-2xl px-10 py-3">
        Pengajuan PKL Lomba
      </h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center text-center bg-primary w-6xl rounded-2xl">
          <img src="/prosedur.png" alt="Illustration" className="w-full max-w-[497px] rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-6xl">
          <div className="z-10 pt-10">
            <div className="flex rounded-full border-2 border-black bg-gray-50">
              <button
                type="button"
                onClick={() => setValue("isGroup", false)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !isGroupSelected
                    ? "bg-orange-500 border-r-2 border-black text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Individu
              </button>
              <button
                type="button"
                onClick={() => setValue("isGroup", true)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isGroupSelected
                    ? "bg-orange-500 border-l-2 border-black text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Kelompok
              </button>
            </div>
          </div>

          <div className="z-10 space-y-4">
            <div className="z-10">
              {isGroupSelected ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap Anggota
                  </label>
                  <textarea
                    {...register("names")}
                    placeholder="Masukkan satu nama per baris (2-3 anggota)"
                    className="w-full min-h-[80px] p-3 border-2 border-black rounded-md resize-vertical"
                    rows={3}
                  />
                  {errors.names && (
                    <p className="text-red-500 text-xs mt-1">{errors.names.message}</p>
                  )}
                </div>
              ) : (
                <Input
                  label="Nama Lengkap"
                  name="names"
                  register={register}
                  errors={errors.names}
                  placeholder="Masukkan nama lengkap"
                  className="z-10 min-w-6xl border-2 border-black font-light"
                />
              )}
            </div>

            <div className="z-10">
              {isGroupSelected ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIM Anggota
                  </label>
                  <textarea
                    {...register("nims")}
                    placeholder="Masukkan satu NIM per baris (sesuai urutan nama)"
                    className="w-full min-h-[80px] p-3 border-2 border-black rounded-md resize-vertical"
                    rows={3}
                  />
                  {errors.nims && (
                    <p className="text-red-500 text-xs mt-1">{errors.nims.message}</p>
                  )}
                </div>
              ) : (
                <Input
                  label="NIM"
                  name="nims"
                  register={register}
                  errors={errors.nims}
                  placeholder="Masukkan NIM"
                  className="z-10 min-w-6xl border-2 border-black font-light"
                />
              )}
            </div>

            <div className="z-10">
              {isGroupSelected ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Anggota
                  </label>
                  <textarea
                    {...register("emails")}
                    placeholder="Masukkan satu email per baris (sesuai urutan nama)"
                    className="w-full min-h-[80px] p-3 border-2 border-black rounded-md resize-vertical"
                    rows={3}
                  />
                  {errors.emails && (
                    <p className="text-red-500 text-xs mt-1">{errors.emails.message}</p>
                  )}
                </div>
              ) : (
                <Input
                  label="Email"
                  name="emails"
                  type="email"
                  register={register}
                  errors={errors.emails}
                  placeholder="Masukkan email"
                  className="z-10 min-w-6xl border-2 border-black font-light"
                />
              )}
            </div>

            <div className="z-10">
              {isGroupSelected ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telepon Anggota
                  </label>
                  <textarea
                    {...register("phoneNumber")}
                    placeholder="Masukkan nomor telepon per baris (sesuai urutan nama)"
                    className="w-full min-h-[80px] p-3 border-2 border-black rounded-md resize-vertical"
                    rows={3}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>
              ) : (
                <Input
                  label="Nomor Telepon"
                  name="phoneNumber"
                  register={register}
                  errors={errors.phoneNumber}
                  placeholder="Masukkan nomor telepon"
                  className="z-10 min-w-6xl border-2 border-black font-light"
                />
              )}
            </div>

            <div className="z-10">
              {isGroupSelected ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total SKS Anggota
                  </label>
                  <textarea
                    {...register("totalSks")}
                    placeholder="Masukkan satu nilai SKS per baris (sesuai urutan nama)"
                    className="w-full min-h-[80px] p-3 border-2 border-black rounded-md resize-vertical"
                    rows={3}
                  />
                  {errors.totalSks && (
                    <p className="text-red-500 text-xs mt-1">{errors.totalSks.message}</p>
                  )}
                </div>
              ) : (
                <Input
                  label="Total SKS"
                  name="totalSks"
                  register={register}
                  errors={errors.totalSks}
                  placeholder="Masukkan total SKS"
                  className="z-10 min-w-6xl border-2 border-black font-light"
                />
              )}
            </div>
          </div>

          <div className="z-10">
            <Input
              label="Nama Kompetisi"
              name="competitionName"
              register={register}
              errors={errors.competitionName}
              placeholder="Masukkan nama kompetisi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Supervisor Kompetisi"
              name="competitionSupervisor"
              register={register}
              errors={errors.competitionSupervisor}
              placeholder="Masukkan nama supervisor kompetisi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Kategori Kompetisi"
              name="competitionCategory"
              register={register}
              errors={errors.competitionCategory}
              placeholder="Masukkan kategori kompetisi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Penyelenggara Kompetisi"
              name="competitionOrganizer"
              register={register}
              errors={errors.competitionOrganizer}
              placeholder="Masukkan nama penyelenggara kompetisi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Informasi Kompetisi"
              name="competitionInformation"
              type="textarea"
              register={register}
              errors={errors.competitionInformation}
              placeholder="Masukkan informasi kompetisi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Tingkat Kompetisi"
              name="competitionLevel"
              register={register}
              errors={errors.competitionLevel}
              placeholder="Masukkan tingkat kompetisi (Lokal/Nasional/Internasional)"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Pemenang Kompetisi"
              name="competitionWinner"
              register={register}
              errors={errors.competitionWinner}
              placeholder="Masukkan posisi pemenang (Juara 1, 2, 3, dll)"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Produk Kompetisi"
              name="competitionProduct"
              type="textarea"
              register={register}
              errors={errors.competitionProduct}
              placeholder="Masukkan deskripsi produk kompetisi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />

          </div>

          <div className="z-10">
            <Input
              label="Tanggal Mulai Kompetisi"
              name="competitionStartDate"
              type="date"
              register={register}
              errors={errors.competitionStartDate}
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Tanggal Selesai Kompetisi"
              name="competitionFinishDate"
              type="date"
              register={register}
              errors={errors.competitionFinishDate}
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <FileUpload
              name="studyResultCardFile"
              file={studyResultCardFile}
              register={register}
              setValue={setValue}
              error={fileError ? { message: fileError, type: "manual" } : undefined}
              label="Kartu Hasil Studi (KHS)"
              className="bg-red-200"
            />
          </div>

          <div className="z-10">
            <FileUpload
              name="proposalCompetitionSertificationFile"
              file={proposalCompetitionSertificationFile}
              register={register}
              setValue={setValue}
              error={proposalFileError ? { message: proposalFileError, type: "manual" } : undefined}
              label="Proposal/Sertifikat Kompetisi"
              className="bg-red-200"
            />
          </div>

          <div className="z-10 flex justify-center pb-12">
            <Button variant="primary" className="py-3 px-16 mt-4 mb-6 text-sm font-semibold">
              Submit Pengajuan
            </Button>
          </div>
        </form>
      </div>
      <SuccessNotification
        isOpen={showSuccessModal}
        title="Pengajuan berhasil disubmit!"
        message="Silahkan menunggu balasan akademik"
        onClose={() => setShowSuccessModal(false)}
      />
      <FooterLayout />
    </main>
  );
};

export default CompetitionApplicationForm;