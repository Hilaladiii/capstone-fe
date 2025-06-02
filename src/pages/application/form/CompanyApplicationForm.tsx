import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { FileUpload } from "../../../components/ui/file-upload";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";
import { useRequestCompanyApplication } from "../../../common/hooks/useInsternship";
import { z } from "zod";
import SuccessNotification from "../../../components/ui/successNotification";

const companyApplicationSchema = z
  .object({
    names: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
    nims: z.string().min(1, { message: "NIM wajib diisi" }),
    emails: z.string().min(1, { message: "Email wajib diisi" }),
    phoneNumber: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
    isGroup: z.boolean(),
    agencyName: z.string().min(1, { message: "Nama instansi wajib diisi" }),
    agencyAddress: z
      .string()
      .min(1, { message: "Alamat instansi wajib diisi" }),
    totalSks: z.string().min(1, { message: "Total SKS wajib diisi" }),
    startDate: z.string().min(1, { message: "Tanggal mulai wajib diisi" }),
    finishDate: z.string().min(1, { message: "Tanggal selesai wajib diisi" }),
    internshipObject: z
      .string()
      .min(1, { message: "Objek magang wajib diisi" }),
    recipientOfLetter: z
      .string()
      .min(1, { message: "Penerima surat wajib diisi" }),
    studyResultCardFile: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.isGroup) {
        const namesArray = data.names
          .split("\n")
          .filter((name) => name.trim() !== "");
        const nimsArray = data.nims
          .split("\n")
          .filter((nim) => nim.trim() !== "");
        const emailsArray = data.emails
          .split("\n")
          .filter((email) => email.trim() !== "");

        if (namesArray.length < 2 || namesArray.length > 3) {
          return false;
        }

        return (
          namesArray.length === nimsArray.length &&
          nimsArray.length === emailsArray.length
        );
      } else {
        const hasMultipleNames = data.names.includes("\n");
        const hasMultipleNims = data.nims.includes("\n");
        const hasMultipleEmails = data.emails.includes("\n");

        return !hasMultipleNames && !hasMultipleNims && !hasMultipleEmails;
      }
    },
    {
      message:
        "Data tidak valid. Untuk kelompok: masukkan 2-3 anggota dengan jumlah nama, NIM, dan email yang sama. Untuk individu: hanya satu data per field.",
      path: ["isGroup"],
    }
  );

type CompanyApplicationFormData = z.infer<typeof companyApplicationSchema>;

const CompanyApplicationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CompanyApplicationFormData>({
    resolver: zodResolver(companyApplicationSchema),
  });

  const { mutate: requestCompanyApplication } = useRequestCompanyApplication();
  const [fileError, setFileError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const studyResultCardFile = watch("studyResultCardFile") as File;
  const isGroupSelected = watch("isGroup") || false;

  const onSubmit: SubmitHandler<CompanyApplicationFormData> = (data) => {
    console.log("onSubmit called!");
    console.log("Form data:", data);

    if (!studyResultCardFile) {
      setFileError("Kartu Hasil Studi wajib diupload");
      return;
    }

    let formattedData;

    if (data.isGroup) {
      const namesArray = data.names
        .split("\n")
        .filter((name) => name.trim() !== "");
      const nimsArray = data.nims
        .split("\n")
        .filter((nim) => nim.trim() !== "");
      const emailsArray = data.emails
        .split("\n")
        .filter((email) => email.trim() !== "");
      const totalSksArray = data.totalSks
        .split("\n")
        .filter((sks) => sks.trim() !== "");

      formattedData = {
        name: namesArray.join(","),
        nim: nimsArray.join(","),
        email: emailsArray.join(","),
        phoneNumber: data.phoneNumber,
        isGroup: data.isGroup,
        agencyName: data.agencyName,
        agencyAddress: data.agencyAddress,
        totalSks:
          totalSksArray.length > 1 ? totalSksArray.join(",") : data.totalSks,
        startDate: new Date(data.startDate).toISOString(),
        finishDate: new Date(data.finishDate).toISOString(),
        internshipObject: data.internshipObject,
        recipientOfLetter: data.recipientOfLetter,
        studyResultCardFile: studyResultCardFile,
      };
    } else {
      formattedData = {
        name: data.names,
        nim: data.nims,
        email: data.emails,
        phoneNumber: data.phoneNumber,
        isGroup: data.isGroup,
        agencyName: data.agencyName,
        agencyAddress: data.agencyAddress,
        totalSks: data.totalSks,
        startDate: new Date(data.startDate).toISOString(),
        finishDate: new Date(data.finishDate).toISOString(),
        internshipObject: data.internshipObject,
        recipientOfLetter: data.recipientOfLetter,
        studyResultCardFile: studyResultCardFile,
      };
    }

    console.log("Submission Data: ", formattedData);

    requestCompanyApplication(formattedData, {
      onSuccess: () => {
        toast.success("Pengajuan berhasil disubmit!");
        setShowSuccessModal(true);
        reset();
        setFileError("");
      },
      onError: (error) => {
        console.error("Error:", error);
        toast.error("Error submitting request");
      },
    });
  };

  return (
    <main className="flex flex-col w-full">
      <h2 className="text-sm w-fit ml-40 font-semibold mt-26 mb-6 bg-primary text-white rounded-2xl px-10 py-3">
        Pengajuan PKL Instansi
      </h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center text-center bg-primary w-6xl rounded-2xl">
          <img
            src="/prosedur.png"
            alt="Illustration"
            className="w-full max-w-[497px] rounded-lg"
          />
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.names.message}
                    </p>
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nims.message}
                    </p>
                  )}
                </div>
              ) : (
                <Input
                  label="NIM"
                  name="nims"
                  register={register}
                  errors={errors.nims}
                  placeholder="Masukkan NIM"
                  className="z-10 min-w-6xl"
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.emails.message}
                    </p>
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
                  className="z-10 min-w-6xl"
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              ) : (
                <Input
                  label="Nomor Telepon"
                  name="phoneNumber"
                  register={register}
                  errors={errors.phoneNumber}
                  placeholder="Masukkan nomor telepon"
                  className="z-10 min-w-6xl"
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.totalSks.message}
                    </p>
                  )}
                </div>
              ) : (
                <Input
                  label="Total SKS"
                  name="totalSks"
                  register={register}
                  errors={errors.totalSks}
                  placeholder="Masukkan total SKS"
                  className="z-10 min-w-6xl"
                />
              )}
            </div>
          </div>

          <div className="z-10">
            <Input
              label="Nama Instansi"
              name="agencyName"
              register={register}
              errors={errors.agencyName}
              placeholder="Masukkan nama instansi"
              className="z-10 min-w-6xl"
            />
          </div>

          <div className="z-10">
            <Input
              label="Alamat Instansi"
              name="agencyAddress"
              register={register}
              errors={errors.agencyAddress}
              placeholder="Masukkan alamat instansi"
              className="z-10 min-w-6xl"
            />
          </div>

          <div className="z-10 grid">
            <Input
              label="Tanggal Mulai"
              name="startDate"
              type="date"
              register={register}
              errors={errors.startDate}
              className="z-10 min-w-6xl"
            />
          </div>

          <div className="z-10 grid">
            <Input
              label="Tanggal Selesai"
              name="finishDate"
              type="date"
              register={register}
              errors={errors.finishDate}
              className="z-10 min-w-6xl"
            />
          </div>

          <div className="z-10">
            <Input
              label="Objek Magang"
              name="internshipObject"
              type="textarea"
              register={register}
              errors={errors.internshipObject}
              placeholder="Masukkan objek magang"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Penerima Surat"
              name="recipientOfLetter"
              register={register}
              errors={errors.recipientOfLetter}
              placeholder="Masukkan nama penerima surat"
              className="z-10 min-w-6xl"
            />
          </div>

          <div className="z-10">
            <FileUpload
              name="studyResultCardFile"
              file={studyResultCardFile}
              register={register}
              setValue={setValue}
              error={
                fileError ? { message: fileError, type: "manual" } : undefined
              }
              label="Kartu Hasil Studi (KHS)"
              className="bg-red-200"
            />
          </div>

          <div className="z-10 flex justify-center pb-12">
            <Button
              variant="primary"
              className="py-3 px-16 mt-4 mb-6 text-sm font-semibold"
            >
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
    </main>
  );
};

export default CompanyApplicationForm;
