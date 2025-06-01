import { ChangeEvent } from "react";
import { cn } from "../../common/utils/cn";

const STATUS = [
  {
    key: "Verifikasi Berkas",
    value: "DOCUMENT_VERIFICATION",
    color: "bg-extra-2",
  },
  {
    key: "Revisi",
    value: "DOCUMENT_REVISION",
    color: "bg-extra-3",
  },
  {
    key: "Proses TTD",
    value: "HEAD_LECTURER_SIGNATURE_PROCESS",
    color: "bg-extra-5",
  },
  {
    key: "Pemilihan Dospem",
    value: "SUPERVISOR_SELECTION",
    color: "bg-extra-7",
  },
  {
    key: "Konfirmasi Dospem",
    value: "SUPERVISOR_CONFIRMATION",
    color: "bg-extra-8",
  },
  {
    key: "Selesai",
    value: "COMPLETED",
    color: "bg-extra-9",
  },
];

const StatusOption = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const selectedValue = STATUS.find((stat) => stat.value === value);
  return (
    <select
      name="status"
      id="status"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn("rounded-full px-5 py-3", selectedValue?.color)}
    >
      <option value="">Pilih Status</option>
      {STATUS.map((status) => (
        <option key={status.value} value={status.value}>
          {status.key}
        </option>
      ))}
    </select>
  );
};

export default StatusOption;
