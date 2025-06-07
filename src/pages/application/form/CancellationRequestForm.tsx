import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { FileUpload } from "../../../components/ui/file-upload";
import { Button } from "../../../components/ui/button";
import { useInternshipCancellation } from "../../../common/hooks/useInsternship";
import { InternshipCancellationApplication } from "../../../common/types/internship.type";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import FooterLayout from "../../../components/layout/FooterLayout";

const RequestCancellationCompany: React.FC = () => {
  const { mutate: submitCancellation, isPending } = useInternshipCancellation();
  const [isGroup, setIsGroup] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InternshipCancellationApplication>({
    defaultValues: {
      groupMembers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupMembers",
  });

  const onSubmit = (data: InternshipCancellationApplication) => {
    data.phoneNumber = data.phoneNumber.replace(/\D/g, "").slice(0, 12);

    if (isGroup) {
      data.groupMembers = data.groupMembers?.map((member) => ({
        ...member,
        phoneNumber: "",
      }));
    }

    submitCancellation({ ...data, isGroup });
  };

  return (
    <main className="flex flex-col w-full">
      <HeaderLayout />
      <h2 className="text-sm w-fit ml-40 font-semibold mt-26 mb-6 bg-primary text-white rounded-2xl px-10 py-3">Pengajuan Pembatalan Masa PKL</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center text-center bg-primary w-6xl rounded-2xl">
          <img src="/prosedur-cancellation.png" alt="Illustration" className="w-full max-w-[497px] rounded-lg" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center font-semibold min-w-6xl mx-auto py-6 space-y-4">
        <div className="flex w-full border-2 border-black rounded-full overflow-hidden">
          <button type="button" onClick={() => setIsGroup(false)} className={`flex-1 py-2 text-sm font-semibold ${!isGroup ? "bg-orange-500 text-white" : "bg-white text-black"} transition-colors duration-200`}>
            Individu
          </button>
          <button type="button" onClick={() => setIsGroup(true)} className={`flex-1 py-2 text-sm font-semibold ${isGroup ? "bg-orange-500 text-white" : "bg-white text-black"} transition-colors duration-200`}>
            Kelompok
          </button>
        </div>

        <Input name="name" label="Nama" register={register} errors={errors.name} placeholder="Masukkan nama lengkap anda" className="w-full min-w-6xl" />

        <Input name="nim" label="NIM" register={register} errors={errors.nim} placeholder="Masukkan NIM lengkap anda" className="w-full min-w-6xl" />

        <Input name="phoneNumber" label="No. HP (whatsapp)" register={register} errors={errors.phoneNumber} placeholder="Masukkan nomor telepon anda" maxLength={12} className="w-full min-w-6xl" />

        <Input name="email" label="Email" register={register} errors={errors.email} placeholder="Masukkan email UB anda" type="email" className="w-full min-w-6xl" />

        {isGroup && (
          <div className="border rounded-lg py-4 bg-gray-50 min-w-6xl">
            <h3 className="font-semibold text-lg mb-2 px-4">Anggota Kelompok (Maksimal 2 anggota dan 1 Ketua)</h3>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 mb-4 border p-4 mx-4 rounded bg-white relative">
                <h4 className="font-semibold">Anggota {index + 1}</h4>
                <Input name={`groupMembers.${index}.name`} label="Nama" register={register} errors={errors.groupMembers?.[index]?.name} placeholder="Masukkan nama anggota" className="min-w-5xl w-full" />
                <Input name={`groupMembers.${index}.nim`} label="NIM" register={register} errors={errors.groupMembers?.[index]?.nim} placeholder="Masukkan nim anggota" className="min-w-5xl w-full" />
                <Input name={`groupMembers.${index}.email`} label="Email" register={register} errors={errors.groupMembers?.[index]?.email} placeholder="Masukkan email anggota" type="email" className="min-w-5xl w-full" />
                <Input name={`groupMembers.${index}.totalSks`} label="SKS Lulus" register={register} errors={errors.groupMembers?.[index]?.totalSks} placeholder="Masukkan sks lulus anggota" className="min-w-5xl w-full" />

                <button type="button" onClick={() => remove(index)} className="absolute top-2 right-2 text-red-500 hover:underline text-sm mx-4">
                  Hapus
                </button>
              </div>
            ))}

            {fields.length < 2 && (
              <Button variant="secondary" onClick={() => append({ name: "", nim: "", email: "", totalSks: "", phoneNumber: "" })} className="mx-4 py-3 text-sm font-semibold">
                Tambah Anggota
              </Button>
            )}
          </div>
        )}

        <Input name="agencyName" label="Nama Instansi" register={register} errors={errors.agencyName} placeholder="Masukkan nama instansi yang anda tuju" className="min-w-6xl w-full" />

        <Input
          name="agencyAddress"
          label="Alamat Instansi"
          register={register}
          errors={errors.agencyAddress}
          placeholder="Masukkan alamat instansi yang anda tuju (Nama jalan, kecamatan, kabupaten/Kota, Provinsi)"
          className="min-w-6xl w-full"
        />

        <div className="min-w-6xl w-full">
          <label className="block font-semibold text-gray-700 mb-2">Alasan Pembatalan</label>
          <textarea
            {...register("cancellationReason", { required: "Cancellation reason is required" })}
            placeholder="Masukkan alasan pembatalan PKL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:to-black-3 focus:border-transparent"
            rows={4}
          />
          {errors.cancellationReason && <p className="text-red-500 text-sm mt-1">{errors.cancellationReason.message}</p>}
        </div>

        <div className="min-w-6xl w-full">
          <FileUpload name="supportingDocumentFile" label="Dokumen Pendukung" file={watch("supportingDocumentFile") ?? undefined} register={register} setValue={setValue} error={errors.supportingDocumentFile} className="min-w-6xl w-full" />
        </div>

        <Button variant="primary" className="my-6 py-3 font-semibold">
          {isPending ? "Submitting..." : "Submit Pengajuan"}
        </Button>
      </form>
      <FooterLayout />
    </main>
  );
};

export default RequestCancellationCompany;
