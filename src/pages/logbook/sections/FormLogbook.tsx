import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Logbook,
  logbookSchema,
} from "../../../common/validation/logbook.validation";
import { Button } from "../../../components/ui/button";
import { useLogbookMutation } from "../../../common/hooks/useLogbookMutation";
import { FileUpload } from "../../../components/ui/file-upload";

const FormLogbook = () => {
  const { mutate: addLogbook, isPending } = useLogbookMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Logbook>({
    resolver: zodResolver(logbookSchema),
  });

  const onSubmit: SubmitHandler<Logbook> = (data) => {
    addLogbook(data, {
      onSuccess() {
        reset();
      },
    });
  };

  const watchFile = watch("file");

  return (
    <div className="text-white font-semibold pt-20 px-16">
      <h1 className="text-secondary py-4 pb-6 text-lg">Tambahkan Data Kegiatan PKL</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          label="Tanggal"
          register={register}
          name="date"
          type="date"
          errors={errors.date}
          className="min-w-full !text-white [&::-webkit-calendar-picker-indicator]:invert"
        />
        <Input
          label="Durasi Waktu"
          register={register}
          name="duration"
          type="number"
          errors={errors.duration}
          className="min-w-full"
        />
        <FileUpload
          label="File Pendukung"
          register={register}
          name="file"
          error={errors.file}
          file={watchFile}
          setValue={setValue}
        />
        <Input
          label="Deskripsi Kegiatan"
          register={register}
          name="description"
          errors={errors.description}
          className="min-w-full"
        />
        <Button variant="secondary" className="text-sm font-semibold py-3 mt-3">
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default FormLogbook;
