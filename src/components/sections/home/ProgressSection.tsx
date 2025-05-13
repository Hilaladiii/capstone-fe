import { useState, useEffect } from "react";
import { useAuth } from "../../../common/hooks/useAuth";
import { getApplicationStatus } from "../../../services/status.service";

const ProgressSection = () => {
  const { token } = useAuth();
  const [progress, setProgress] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const documentStatus = await getApplicationStatus(token);
        setProgress(documentStatus);
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    };

    fetchStatus();
  }, [token]);

  const stages = [
    { key: "DOCUMENT_VERIFICATION", label: "Verifikasi Berkas" },
    { key: "DOCUMENT_REVISION", label: "Revisi Dokumen" },
    { key: "LECTURER_SIGNATURE_PROCESS", label: "Proses TTD" },
    { key: "COMPLETED", label: "Sudah Dikirim" },
  ];

  const currentStageIndex = stages.findIndex((stage) => stage.key === progress);

  return (
    <section className="w-full mx-auto px-4 py-20 bg-primary">
      <h1 className="text-3xl font-bold text-secondary px-10 mb-14">Progress Pengajuan</h1>
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute top-1/6 left-44 right-0 h-3 bg-white z-0" style={{ width: "75%" }}></div>
        {stages.map((stage, index) => {
          const isCurrent = index === currentStageIndex;
          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center w-1/4">
              <div
                className={`w-8 h-8 rounded-full border-6 ${
                  isCurrent
                    ? "bg-secondary border-white"
                    : "bg-primary border-white"
                }`}
              ></div>
              <span className="mt-4 text-white font-semibold text-md text-center">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProgressSection;
