import { Button } from "../../../components/ui/button";
import { useDeleteLogbookMutation } from "../../../common/hooks/useLogbookMutation";

interface DeleteConfirmationModalProps {
  logbookId: string;
  isOpen: boolean;
  onClose: () => void;
  logbookDescription: string;
}

const DeleteConfirmationModal = ({ 
  logbookId, 
  isOpen, 
  onClose, 
}: DeleteConfirmationModalProps) => {
  const { mutate: deleteLogbook, isPending } = useDeleteLogbookMutation();

  const handleDelete = () => {
    deleteLogbook(logbookId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-80 h-50">
        <div className="mb-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Konfirmasi Hapus Logbook
          </h2>
          <p className="text-gray-600 text-center">
            Apakah Anda yakin ingin menghapus logbook ini?
          </p>
        </div>

        <div className="flex flex-row items-center justify-center space-x-3 pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="py-2 px-8 text-sm font-semibold cursor-pointer"
          >
            Batal
          </Button>
          <Button
            variant="secondary"
            onClick={handleDelete}
            className="py-2 px-8 text-sm font-semibold cursor-pointer"
          >
            {isPending ? "Loading..." : "Hapus"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;