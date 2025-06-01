interface BadgeDateTimeProps {
  datetime: string | number;
  type: "date" | "time";
}
import { clsx } from "clsx";

const BadgeDateTime = ({ datetime, type }: BadgeDateTimeProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center text-white text-xs px-5 py-1.5 rounded-full font-semibold",
        type === "date" ? "bg-secondary" : "bg-accent"
      )}
    >
      {type === "date"
        ? new Date(datetime).toLocaleDateString("id")
        : datetime + " jam"}
    </div>
  );
};

export default BadgeDateTime;
