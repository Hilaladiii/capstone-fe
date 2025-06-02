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
    // Clean phone number
    data.phoneNumber = data.phoneNumber.replace(/\D/g, '').slice(0, 12);

    // If group, clean up unnecessary phone numbers
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
      <h2 className="text-sm w-fit ml-40 font-semibold mt-26 mb-6 bg-primary text-white rounded-2xl px-10 py-3">Pengajuan Pembatalan Masa PKL</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center text-center bg-primary w-6xl rounded-2xl">
          <img src="/prosedur.png" alt="Illustration" className="w-full max-w-[497px] rounded-lg" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center min-w-6xl mx-auto py-6 space-y-4">
        <div className="flex w-full border-2 border-black rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsGroup(false)}
            className={`flex-1 py-2 text-sm font-semibold ${
              !isGroup
                ? 'bg-orange-500 text-white'
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
                ? 'bg-orange-500 text-white'
                : 'bg-white text-black'
            } transition-colors duration-200`}
          >
            Kelompok
          </button>
        </div>

        <Input
          name="name"
          label="Name"
          register={register}
          errors={errors.name}
          placeholder="Enter your full name"
          className='w-full min-w-6xl'
        />

        <Input
          name="nim"
          label="NIM"
          register={register}
          errors={errors.nim}
          placeholder="Student ID"
          className='w-full min-w-6xl'
        />

        <Input
          name="phoneNumber"
          label="Phone Number (10–12 digits)"
          register={register}
          errors={errors.phoneNumber}
          placeholder="08xxxxxxxxxx"
          maxLength={12}
          className='w-full min-w-6xl'
        />

        <Input
          name="email"
          label="Email"
          register={register}
          errors={errors.email}
          placeholder="your@email.com"
          type="email"
          className='w-full min-w-6xl'
        />

        {/* Group Members Section */}
        {isGroup && (
          <div className="border rounded-lg py-4 bg-gray-50 min-w-6xl">
            <h3 className="font-semibold text-lg mb-2 px-4">Group Members (Max 2)</h3>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 mb-4 border p-4 mx-4 rounded bg-white relative">
                <h4 className="font-semibold">Member {index + 1}</h4>
                <Input
                  name={`groupMembers.${index}.name`}
                  label="Name"
                  register={register}
                  errors={errors.groupMembers?.[index]?.name}
                  placeholder="Group member name"
                  className='min-w-5xl w-full'
                />
                <Input
                  name={`groupMembers.${index}.nim`}
                  label="NIM"
                  register={register}
                  errors={errors.groupMembers?.[index]?.nim}
                  placeholder="Student ID"
                  className='min-w-5xl w-full'
                />
                <Input
                  name={`groupMembers.${index}.email`}
                  label="Email"
                  register={register}
                  errors={errors.groupMembers?.[index]?.email}
                  placeholder="member@email.com"
                  type="email"
                  className='min-w-5xl w-full'
                />
                <Input
                  name={`groupMembers.${index}.totalSks`}
                  label="Total SKS"
                  register={register}
                  errors={errors.groupMembers?.[index]?.totalSks}
                  placeholder="e.g. 120"
                  className='min-w-5xl w-full'
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:underline text-sm mx-4"
                >
                  Remove
                </button>
              </div>
            ))}

            {fields.length < 2 && (
              <Button 
                variant='secondary' 
                onClick={() => append({ name: '', nim: '', email: '', totalSks: '', phoneNumber: '' })}
                className='mx-4 py-3 text-sm font-semibold'
              >
                Add Member
              </Button>
            )}
          </div>
        )}

        <Input
          name="agencyName"
          label="Agency Name"
          register={register}
          errors={errors.agencyName}
          placeholder="Company name"
          className='min-w-6xl w-full'
        />

        <Input
          name="agencyAddress"
          label="Agency Address"
          register={register}
          errors={errors.agencyAddress}
          placeholder="Address"
          className='min-w-6xl w-full'
        />

        <Input
          name="totalSks"
          label="Total SKS"
          register={register}
          errors={errors.totalSks}
          placeholder="e.g. 120"
          className='min-w-6xl w-full'
        />

        <Input
          name="startDate"
          label="Start Date"
          register={register}
          errors={errors.startDate}
          type="datetime-local"
          className='min-w-6xl w-full'
        />

        <Input
          name="finishDate"
          label="Finish Date"
          register={register}
          errors={errors.finishDate}
          type="datetime-local"
          className='min-w-6xl w-full'
        />

        <Input
          name="internshipObject"
          label="Internship Object"
          register={register}
          errors={errors.internshipObject}
          placeholder="Software Development, etc."
          className='min-w-6xl w-full'
        />

        <Input
          name="recipientOfLetter"
          label="Recipient of Letter"
          register={register}
          errors={errors.recipientOfLetter}
          placeholder="To whom it may concern"
          className='min-w-6xl w-full'
        />

        <div className='min-w-6xl w-full'>
        <FileUpload
          name="studyResultCardFile"
          label="Upload Study Result Card"
          file={watch("studyResultCardFile") ?? undefined}
          register={register}
          setValue={setValue}
          error={errors.studyResultCardFile}
          className='min-w-6xl w-full'
        />
        </div>

        <Button variant="primary" className="mt-4">
          {isPending ? 'Submitting...' : 'Submit Pengajuan'}
        </Button>
      </form>
      < FooterLayout />
    </main>
  );
};

export default RequestApplicationCompany;
