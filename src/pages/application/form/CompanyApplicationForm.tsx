import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from "../../../components/ui/input"; 
import { FileUpload } from "../../../components/ui/file-upload";
import { Button } from "../../../components/ui/button";
import { useInternship } from '../../../common/hooks/useInsternship';
import { InternshipApplication } from '../../../common/types/internshipp.type';
import HeaderLayout from '../../../components/layout/HeaderLayout';
import FooterLayout from '../../../components/layout/FooterLayout';

const RequestApplicationCompany: React.FC = () => {
  const { mutate: submitApplication, isPending } = useInternship();
  const [isGroup, setIsGroup] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InternshipApplication>({
    defaultValues: {
      groupMembers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupMembers',
  });

  const onSubmit = (data: InternshipApplication) => {
    data.phoneNumber = data.phoneNumber.replace(/\D/g, '').slice(0, 12);

    if (isGroup) {
      data.groupMembers = data.groupMembers.map((member) => ({
        ...member,
        phoneNumber: '',
      }));
    }

    submitApplication({ ...data, isGroup });
  };

  return (
    <main className='flex flex-col w-full'>
      <HeaderLayout />
      <h2 className="text-sm w-fit ml-40 font-semibold mt-26 mb-6 bg-primary text-white rounded-2xl px-10 py-3">Pengajuan PKL Instansi</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center text-center bg-primary w-6xl rounded-2xl">
          <img src="/prosedur-company.png" alt="Illustration" className="w-full max-w-[497px] rounded-lg" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center min-w-6xl mx-auto py-6 space-y-4">
        <div className="flex w-full border-2 border-black rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsGroup(false)}
            className={`flex-1 py-2 text-sm font-semibold ${
              !isGroup
                ? 'bg-secondary text-white'
                : 'bg-white text-black'
            } transition-colors duration-200`}
          >
            Individu
          </button>
          <button
            type="button"
            onClick={() => setIsGroup(true)}
            className={`flex-1 py-2 text-sm font-semibold ${
              isGroup
                ? 'bg-secondary text-white'
                : 'bg-white text-black'
            } transition-colors duration-200`}
          >
            Kelompok
          </button>
        </div>

        <Input
          name="name"
          label="Nama"
          register={register}
          errors={errors.name}
          placeholder="Masukkan nama lengkap anda"
          className='w-full min-w-6xl'
        />

        <Input
          name="nim"
          label="NIM"
          register={register}
          errors={errors.nim}
          placeholder="Masukkan NIM anda"
          className='w-full min-w-6xl'
        />

        <Input
          name="phoneNumber"
          label="No. HP (whatsapp)"
          register={register}
          errors={errors.phoneNumber}
          placeholder="Masukkan nomor telepon anda"
          maxLength={12}
          className='w-full min-w-6xl'
        />

        <Input
          name="email"
          label="Email"
          register={register}
          errors={errors.email}
          placeholder="Masukkan email UB anda"
          type="email"
          className='w-full min-w-6xl'
        />

        <Input
          name="totalSks"
          label="SKS Lulus"
          register={register}
          errors={errors.totalSks}
          placeholder="Masukkan jumlah sks lulus anda"
          className='min-w-6xl w-full'
        />

        {isGroup && (
          <div className="border rounded-lg py-4 bg-gray-50 min-w-6xl">
            <h3 className="font-semibold text-lg mb-2 px-4">Anggota Kelompok (Maksimal 2 anggota dan 1 Ketua)</h3>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 mb-4 border p-4 mx-4 rounded bg-white relative">
                <h4 className="font-semibold">Anggota {index + 1}</h4>
                <Input
                  name={`groupMembers.${index}.name`}
                  label="Nama"
                  register={register}
                  errors={errors.groupMembers?.[index]?.name}
                  placeholder="Masukkan nama anggota"
                  className='min-w-5xl w-full'
                />
                <Input
                  name={`groupMembers.${index}.nim`}
                  label="NIM"
                  register={register}
                  errors={errors.groupMembers?.[index]?.nim}
                  placeholder="Masukkan NIM anggota"
                  className='min-w-5xl w-full'
                />
                <Input
                  name={`groupMembers.${index}.email`}
                  label="Email"
                  register={register}
                  errors={errors.groupMembers?.[index]?.email}
                  placeholder="Masukkan Email anggota"
                  type="email"
                  className='min-w-5xl w-full'
                />
                <Input
                  name={`groupMembers.${index}.totalSks`}
                  label="SKS lulus"
                  register={register}
                  errors={errors.groupMembers?.[index]?.totalSks}
                  placeholder="Masukkan jumlah sks lulus anggota"
                  className='min-w-5xl w-full'
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:underline text-sm mx-4"
                >
                  Hapus
                </button>
              </div>
            ))}

            {fields.length < 2 && (
              <Button 
                variant='secondary' 
                onClick={() => append({ name: '', nim: '', email: '', totalSks: '', phoneNumber: '' })}
                className='mx-4 py-3 text-sm font-semibold'
              >
                Tambah Anggota
              </Button>
            )}
          </div>
        )}

        <Input
          name="recipientOfLetter"
          label="Penerima Surat"
          register={register}
          errors={errors.recipientOfLetter}
          placeholder="Masukkan penerima surat dari instansi yang anda lamar"
          className='min-w-6xl w-full'
        />

        <Input
          name="agencyName"
          label="Nama Instansi"
          register={register}
          errors={errors.agencyName}
          placeholder="Masukkan nama instansi yang anda lamar"
          className='min-w-6xl w-full'
        />

        <Input
          name="agencyAddress"
          label="Alamat Instansi"
          register={register}
          errors={errors.agencyAddress}
          placeholder="Masukkan alamat instansi anda (nama jalan, kecamatan, kabupaten/kota, provinsi)"
          className='min-w-6xl w-full'
        />

        <Input
          name="internshipObject"
          label="Objek PKL"
          register={register}
          errors={errors.internshipObject}
          placeholder="Masukkan objek pkl yang anda ajukan (bisa diisi dengan mata kuliah terkait)"
          className='min-w-6xl w-full'
        />

        <Input
          name="startDate"
          label="Tanggal mulai PKL"
          register={register}
          errors={errors.startDate}
          type="datetime-local"
          className='min-w-6xl w-full'
        />

        <Input
          name="finishDate"
          label="Tanggal selesai PKL"
          register={register}
          errors={errors.finishDate}
          type="datetime-local"
          className='min-w-6xl w-full'
        />

        <div className='min-w-6xl w-full font-semibold'>
        <FileUpload
          name="studyResultCardFile"
          label="KHS Semester Akhir"
          file={watch("studyResultCardFile") ?? undefined}
          register={register}
          setValue={setValue}
          error={errors.studyResultCardFile}
          className='min-w-6xl w-full'
        />
        </div>

        <Button variant="primary" className="my-6 py-3 font-semibold">
          {isPending ? 'Submitting...' : 'Submit Pengajuan'}
        </Button>
      </form>
      < FooterLayout />
    </main>
  );
};

export default RequestApplicationCompany;
