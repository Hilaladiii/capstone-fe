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
    <div>
      <h1>Tambahkan Data Kegiatan PKL</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Tanggal"
          register={register}
          name="date"
          type="date"
          errors={errors.date}
        />
        <Input
          label="Durasi"
          register={register}
          name="duration"
          type="number"
          errors={errors.duration}
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
          label="Deskripsi"
          register={register}
          name="description"
          errors={errors.description}
        />
        <Button variant="secondary">
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default FormLogbook;
