import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from "../../../components/ui/input"; 
import { FileUpload } from "../../../components/ui/file-upload";
import { Button } from "../../../components/ui/button";
import { useInternshipCompetition } from '../../../common/hooks/useInsternship';
import { InternshipCompetitionApplication } from '../../../common/types/internshipp.type';
import HeaderLayout from '../../../components/layout/HeaderLayout';
import FooterLayout from '../../../components/layout/FooterLayout';

const RequestApplicationCompetition: React.FC = () => {
  const { mutate: submitApplication, isPending } = useInternshipCompetition();
  const [isGroup, setIsGroup] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InternshipCompetitionApplication>({
    defaultValues: {
      groupMembers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupMembers',
  });

  const onSubmit = (data: InternshipCompetitionApplication) => {
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
      <h2 className="text-sm w-fit ml-40 font-semibold mt-26 mb-6 bg-primary text-white rounded-2xl px-10 py-3">Pengajuan Pembatalan Masa PKL - Kompetisi</h2>
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
          name="totalSks"
          label="Total SKS"
          register={register}
          errors={errors.totalSks}
          placeholder="e.g. 120"
          className='min-w-6xl w-full'
        />

        {/* Competition Specific Fields */}
        <Input
          name="competitionName"
          label="Competition Name"
          register={register}
          errors={errors.competitionName}
          placeholder="e.g. IT Competition"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionSupervisor"
          label="Competition Supervisor"
          register={register}
          errors={errors.competitionSupervisor}
          placeholder="Supervisor name"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionCategory"
          label="Competition Category"
          register={register}
          errors={errors.competitionCategory}
          placeholder="e.g. IT, Programming"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionOrganizer"
          label="Competition Organizer"
          register={register}
          errors={errors.competitionOrganizer}
          placeholder="Organizer name"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionInformation"
          label="Competition Information"
          register={register}
          errors={errors.competitionInformation}
          placeholder="Website or additional info"
          className='min-w-6xl w-full'
        />

        <div className="w-full min-w-6xl">
          <label className="block text-sm font-medium mb-2">Competition Level</label>
          <select
            {...register('competitionLevel')}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Level</option>
            <option value="Local">Local</option>
            <option value="Regional">Regional</option>
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
          {errors.competitionLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.competitionLevel.message}</p>
          )}
        </div>

        <Input
          name="competitionWinner"
          label="Competition Winner/Achievement"
          register={register}
          errors={errors.competitionWinner}
          placeholder="e.g. Juara 1, Winner"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionProduct"
          label="Competition Product/Portfolio"
          register={register}
          errors={errors.competitionProduct}
          placeholder="URL to your product/portfolio"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionStartDate"
          label="Competition Start Date"
          register={register}
          errors={errors.competitionStartDate}
          type="datetime-local"
          className='min-w-6xl w-full'
        />

        <Input
          name="competitionFinishDate"
          label="Competition Finish Date"
          register={register}
          errors={errors.competitionFinishDate}
          type="datetime-local"
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

        <div className='min-w-6xl w-full'>
          <FileUpload
            name="proposalCompetitionSertificationFile"
            label="Upload Competition Proposal/Certification"
            file={watch("proposalCompetitionSertificationFile") ?? undefined}
            register={register}
            setValue={setValue}
            error={errors.proposalCompetitionSertificationFile}
            className='min-w-6xl w-full'
          />
        </div>

        <Button variant="primary" className="mt-4">
          {isPending ? 'Submitting...' : 'Submit Pengajuan'}
        </Button>
      </form>
      <FooterLayout />
    </main>
  );
};

export default RequestApplicationCompetition;