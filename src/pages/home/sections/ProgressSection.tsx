import { useInternshipStatus } from "../../../common/hooks/useInsternship";

const ProgressStatus = () => {
  const { data: progress, error, isLoading } = useInternshipStatus();

  const stages = [
    { key: "DOCUMENT_VERIFICATION", label: "Verifikasi Berkas" },
    { key: "DOCUMENT_REVISION", label: "Revisi Dokumen" },
    { key: "HEAD_LECTURER_SIGNATURE_PROCESS", label: "Proses TTD" },
    { key: "COMPLETED", label: "Sudah Dikirim" },
  ];

  const currentStageIndex = stages.findIndex((stage) => stage.key === progress);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <section className="w-full mx-auto py-20 bg-primary">
      <h1 className="text-2xl font-bold text-secondary px-20 mb-14">Progress Pengajuan</h1>
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute top-1/6 left-44 right-0 h-1.5 bg-white z-0 w-274"></div>
        {stages.map((stage, index) => {
          const isCurrent = index === currentStageIndex;
          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center w-1/4">
              <div
                className={`w-6 h-6 rounded-full border-5 ${
                  isCurrent ? "bg-secondary border-white" : "bg-primary border-white"
                }`}
              ></div>
              <span className="mt-4 text-white font-semibold text-sm text-center">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProgressStatus;
