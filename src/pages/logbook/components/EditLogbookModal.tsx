import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useUpdateLogbookMutation, UpdateLogbookData } from "../../../common/hooks/useLogbookMutation";
import { Logbook as LogbookType } from "../../../common/types/logbook.type";

const editLogbookSchema = z.object({
  duration: z.coerce.number().min(1, "Durasi wajib diisi").optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 3 * 1024 * 1024, "Maksimal ukuran file 3MB")
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/png",
          "image/jpeg",
          "image/jpg",
        ].includes(file.type),
      "File harus bertipe pdf, docx, png, atau jpg/jpeg"
    )
    .optional()
    .nullable(),
  description: z.string().min(1, "Deskripsi wajib diisi").optional(),
});

type EditLogbookForm = z.infer<typeof editLogbookSchema>;

interface EditLogbookModalProps {
  logbook: LogbookType;
  isOpen: boolean;
  onClose: () => void;
}

const EditLogbookModal = ({ logbook, isOpen, onClose }: EditLogbookModalProps) => {
  const { mutate: updateLogbook, isPending } = useUpdateLogbookMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditLogbookForm>({
    resolver: zodResolver(editLogbookSchema),
    defaultValues: {
      file: null,
      description: "",
      duration: undefined,
    },
  });

  useEffect(() => {
    if (logbook && isOpen) {
      setValue("description", logbook.description);
      setValue("duration", logbook.duration);
      setValue("file", null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [logbook, isOpen, setValue]);

  const onSubmit: SubmitHandler<EditLogbookForm> = (data) => {
    const updateData: UpdateLogbookData = {};
    
    if (data.description && data.description !== logbook.description) {
      updateData.description = data.description;
    }
    
    if (data.duration && data.duration !== logbook.duration) {
      updateData.duration = data.duration;
    }
    
    if (data.file) {
      updateData.file = data.file;
      console.log("File will be uploaded:", data.file.name); // Debug log
    }

    if (Object.keys(updateData).length === 0) {
      console.log("No changes detected");
      return;
    }
    
    updateLogbook(
      { logbookId: logbook.logbookId, data: updateData },
      {
        onSuccess: () => {
          console.log("Update successful");
          reset();
          onClose();
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      }
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      setValue("file", file, { shouldValidate: true });
    } else {
      setValue("file", null);
    }
  };

  const removeFile = () => {
    setValue("file", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const watchFile = watch("file");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold bg-primary rounded-full py-2 px-10 text-white">Edit Logbook</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1 rounded-lg border-2 border-borderDefault p-3">
            <h3 className="text-sm font-medium text-black-2">Tanggal (Tidak dapat diubah):</h3>
            <p className="text-sm font-medium">{new Date(logbook.date).toLocaleDateString("id-ID")}</p>
          </div>

          <Input
            label="Durasi Waktu (jam)"
            register={register}
            name="duration"
            type="number"
            errors={errors.duration}
            className="min-w-full"
          />

          <div className="space-y-2">
            <label className="block font-semibold">
              File Pendukung (Opsional)
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-extra-1 file:text-primary hover:file:bg-secondary"
            />
            
            {errors.file && (
              <p className="text-error text-sm">{errors.file.message}</p>
            )}

            {watchFile && !errors.file && (
              <div className="flex items-center justify-between p-3 rounded-lg border-2 border-borderDefault">
                <div>
                  <p className="text-sm font-medium">File baru:</p>
                  <p className="text-sm text-info">{watchFile.name}</p>
                </div>
                <button 
                  onClick={removeFile}
                  className="text-black-3 hover:text-red-500 p-2"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {(!watchFile || errors.file) && logbook.fileOriginalName && (
            <div className="text-sm text-black-3 p-3 rounded-lg border-2 border-borderDefault">
              <p className="font-medium">File saat ini:</p>
              <a 
                href={logbook.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black-3 hover:text-blue-800 underline"
              >
                {logbook.fileOriginalName}
              </a>
              <p className="text-xs text-black-2 mt-1">
                Upload file baru jika ingin mengganti
              </p>
            </div>
          )}
          
          <Input
            label="Deskripsi Kegiatan"
            register={register}
            name="description"
            errors={errors.description}
            className="min-w-full"
          />

          <div className="space-x-2 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1 cursor-pointer text-sm py-2 px-8 font-semibold"
            >
              Batal
            </Button>
            <Button
              variant="secondary"
              className="flex-1 cursor-pointer text-sm py-2 px-8 font-semibold"
            >
              {isPending ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLogbookModal;