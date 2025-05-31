import { Button } from "./button";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const SuccessNotification = ({ isOpen, title, message, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
      <div className="flex flex-col justify-center items-center bg-white border-2 border-black p-6 rounded-[20px] w-88 h-50 text-center">
        <h2 className="text-sm font-semibold mb-5">{title}</h2>
        <p className="text-xs font-semibold mb-4">{message}</p>
        <Button variant="secondary" onClick={onClose} className="py-3 px-26 mt-4 text-sm cursor-pointer">
          Tutup
        </Button>
      </div>
    </div>
  );
};

export default SuccessNotification;