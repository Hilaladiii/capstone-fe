import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { FileUpload } from "../../../components/ui/file-upload";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";
// import { useRequestExtension } from "../../../common/hooks/useInsternship";
import { z } from "zod";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import FooterLayout from "../../../components/layout/FooterLayout";
import SuccessNotification from "../../../components/ui/successNotification";

const extensionRequestSchema = z.object({
  names: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  nims: z.string().min(1, { message: "NIM wajib diisi" }),
  emails: z.string().min(1, { message: "Email wajib diisi" }),
  phoneNumbers: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  totalSks: z.string().min(1, { message: "Total SKS wajib diisi" }),
  isGroup: z.boolean(),
  agencyName: z.string().min(1, { message: "Nama instansi wajib diisi" }),
  agencyAddress: z.string().min(1, { message: "Alamat instansi wajib diisi" }),
  startDatePeriod: z.string().min(1, { message: "Tanggal mulai periode wajib diisi" }),
  finishDatePeriod: z.string().min(1, { message: "Tanggal selesai periode wajib diisi" }),
  startExtensionDatePeriod: z.string().min(1, { message: "Tanggal mulai perpanjangan wajib diisi" }),
  finishExtensionDatePeriod: z.string().min(1, { message: "Tanggal selesai perpanjangan wajib diisi" }),
  reasonExtension: z.string().min(1, { message: "Alasan perpanjangan wajib diisi" }),
  internshipApplicationFile: z.any().optional(),
  intershipExtensionFile: z.any().optional(),
}).refine((data) => {
  if (data.isGroup) {
    const namesArray = data.names.split('\n').filter(name => name.trim() !== '');
    const nimsArray = data.nims.split('\n').filter(nim => nim.trim() !== '');
    const emailsArray = data.emails.split('\n').filter(email => email.trim() !== '');
    const phonesArray = data.phoneNumbers.split('\n').filter(phone => phone.trim() !== '');

    if (namesArray.length < 2 || namesArray.length > 3) {
      return false;
    }

    return namesArray.length === nimsArray.length && 
           nimsArray.length === emailsArray.length &&
           emailsArray.length === phonesArray.length &&
           emailsArray.every(email => email.includes('@student.ub.ac.id'));
  } else {
    const hasMultipleNames = data.names.includes('\n');
    const hasMultipleNims = data.nims.includes('\n');
    const hasMultipleEmails = data.emails.includes('\n');
    const hasMultiplePhones = data.phoneNumbers.includes('\n');
    
    return !hasMultipleNames && !hasMultipleNims && !hasMultipleEmails && !hasMultiplePhones &&
           data.emails.includes('@student.ub.ac.id');
  }
}, {
  message: "Data tidak valid. Untuk kelompok: masukkan 2-3 anggota dengan jumlah yang sama. Untuk individu: hanya satu data per field. Email harus menggunakan domain @student.ub.ac.id",
  path: ["isGroup"],
});

type ExtensionRequestFormData = z.infer<typeof extensionRequestSchema>;

const ExtensionRequestForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ExtensionRequestFormData>({
    resolver: zodResolver(extensionRequestSchema),
  });

  const { mutate: requestExtension } = useRequestExtension();
  const [applicationFileError, setApplicationFileError] = useState<string>("");
  const [extensionFileError, setExtensionFileError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const internshipApplicationFile = watch("internshipApplicationFile") as File;
  const intershipExtensionFile = watch("intershipExtensionFile") as File;
  const isGroupSelected = watch("isGroup") || false;

  const onSubmit: SubmitHandler<ExtensionRequestFormData> = (data) => {
    console.log("onSubmit called!");
    console.log("Form data:", data);

    if (!internshipApplicationFile) {
      setApplicationFileError("File aplikasi magang wajib diupload");
      return;
    }

    if (!intershipExtensionFile) {
      setExtensionFileError("File perpanjangan magang wajib diupload");
      return;
    }

    let formattedData;
    
    if (data.isGroup) {
      const namesArray = data.names.split('\n').filter(name => name.trim() !== '');
      const nimsArray = data.nims.split('\n').filter(nim => nim.trim() !== '');
      const emailsArray = data.emails.split('\n').filter(email => email.trim() !== '');
      const phonesArray = data.phoneNumbers.split('\n').filter(phone => phone.trim() !== '');
      const totalSksArray = data.totalSks.split('\n').filter(sks => sks.trim() !== '');

      formattedData = {
        name: namesArray.join(","),
        nim: nimsArray.join(","),
        email: emailsArray.join(","),
        phoneNumber: phonesArray.join(","),
        totalSks: totalSksArray.length > 1 ? totalSksArray.join(",") : data.totalSks,
        isGroup: data.isGroup,
        agencyName: data.agencyName,
        agencyAddress: data.agencyAddress,
        startDatePeriod: new Date(data.startDatePeriod).toISOString(),
        finishDatePeriod: new Date(data.finishDatePeriod).toISOString(),
        startExtensionDatePeriod: new Date(data.startExtensionDatePeriod).toISOString(),
        finishExtensionDatePeriod: new Date(data.finishExtensionDatePeriod).toISOString(),
        reasonExtension: data.reasonExtension,
        internshipApplicationFile: internshipApplicationFile,
        intershipExtensionFile: intershipExtensionFile,
      };
    } else {
      formattedData = {
        name: data.names,
        nim: data.nims,
        email: data.emails,
        phoneNumber: data.phoneNumbers,
        totalSks: data.totalSks,
        isGroup: data.isGroup,
        agencyName: data.agencyName,
        agencyAddress: data.agencyAddress,
        startDatePeriod: new Date(data.startDatePeriod).toISOString(),
        finishDatePeriod: new Date(data.finishDatePeriod).toISOString(),
        startExtensionDatePeriod: new Date(data.startExtensionDatePeriod).toISOString(),
        finishExtensionDatePeriod: new Date(data.finishExtensionDatePeriod).toISOString(),
        reasonExtension: data.reasonExtension,
        internshipApplicationFile: internshipApplicationFile,
        intershipExtensionFile: intershipExtensionFile,
      };
    }

    console.log("Submission Data: ", formattedData);

    requestExtension(formattedData, {
      onSuccess: () => {
        toast.success("Pengajuan berhasil disubmit!");
        setShowSuccessModal(true);
        reset();
        setApplicationFileError("");
        setExtensionFileError("");
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
        Pengajuan Perpanjangan Masa PKL
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
                    {...register("phoneNumbers")}
                    placeholder="Masukkan nomor telepon per baris (sesuai urutan nama)"
                    className="w-full min-h-[80px] p-3 border-2 border-black rounded-md resize-vertical"
                    rows={3}
                  />
                  {errors.phoneNumbers && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumbers.message}</p>
                  )}
                </div>
              ) : (
                <Input
                  label="Nomor Telepon"
                  name="phoneNumbers"
                  register={register}
                  errors={errors.phoneNumbers}
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
              label="Nama Instansi"
              name="agencyName"
              register={register}
              errors={errors.agencyName}
              placeholder="Masukkan nama instansi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Alamat Instansi"
              name="agencyAddress"
              register={register}
              errors={errors.agencyAddress}
              placeholder="Masukkan alamat instansi"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10 grid grid-cols-2 gap-x-8">
            <Input
              label="Tanggal Mulai Periode"
              name="startDatePeriod"
              type="date"
              register={register}
              errors={errors.startDatePeriod}
              className="z-10 min-w-140 border-2 border-black font-light"
            />
            <Input
              label="Tanggal Selesai Periode"
              name="finishDatePeriod"
              type="date"
              register={register}
              errors={errors.finishDatePeriod}
              className="z-10 min-w-140 border-2 border-black font-light"
            />
          </div>

          <div className="z-10 grid grid-cols-2 gap-x-8">
            <Input
              label="Tanggal Mulai Perpanjangan"
              name="startExtensionDatePeriod"
              type="date"
              register={register}
              errors={errors.startExtensionDatePeriod}
              className="z-10 min-w-140 border-2 border-black font-light"
            />
            <Input
              label="Tanggal Selesai Perpanjangan"
              name="finishExtensionDatePeriod"
              type="date"
              register={register}
              errors={errors.finishExtensionDatePeriod}
              className="z-10 min-w-140 border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <Input
              label="Alasan Perpanjangan"
              name="reasonExtension"
              type="textarea"
              register={register}
              errors={errors.reasonExtension}
              placeholder="Masukkan alasan perpanjangan"
              className="z-10 min-w-6xl border-2 border-black font-light"
            />
          </div>

          <div className="z-10">
            <FileUpload
              name="internshipApplicationFile"
              file={internshipApplicationFile}
              register={register}
              setValue={setValue}
              error={applicationFileError ? { message: applicationFileError, type: "manual" } : undefined}
              label="File Aplikasi Magang"
              className="bg-red-200"
            />
          </div>

          <div className="z-10">
            <FileUpload
              name="intershipExtensionFile"
              file={intershipExtensionFile}
              register={register}
              setValue={setValue}
              error={extensionFileError ? { message: extensionFileError, type: "manual" } : undefined}
              label="File Perpanjangan Magang"
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

export default ExtensionRequestForm;