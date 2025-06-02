import { useInternshipStatus } from "../../../common/hooks/useInsternship";

<<<<<<< HEAD
const ProgressSection = () => {
  const { data: progress } = useInternshipStatus();

=======
const ProgressStatus = () => {
  const { data: progress } = useInternshipStatus();
  
>>>>>>> 7bc83d975778921ad1849f9017975fcc9752694c
  const stages = [
    { key: "DOCUMENT_VERIFICATION", label: "Verifikasi Berkas" },
    { key: "DOCUMENT_REVISION", label: "Revisi Dokumen" },
    { key: "HEAD_LECTURER_SIGNATURE_PROCESS", label: "Proses TTD" },
    { key: "COMPLETED", label: "Sudah Dikirim" },
  ];
<<<<<<< HEAD

  const currentStageIndex = progress
    ? stages.findIndex((stage) => stage.key === progress)
    : -1;

=======
  
  const currentStageIndex = stages.findIndex((stage) => stage.key === progress);
  
  
>>>>>>> 7bc83d975778921ad1849f9017975fcc9752694c
  return (
    <section className="w-full mx-auto py-20 bg-primary">
      <h1 className="text-2xl font-bold text-secondary px-20 mb-14">
        Progress Pengajuan
      </h1>
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute top-1/6 w-full h-1.5 bg-white z-0"></div>
        {stages.map((stage, index) => {
          const isCurrent = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          
          return (
            <div
              key={stage.key}
              className="relative z-10 flex flex-col items-center w-1/4"
            >
              <div
                className={`w-6 h-6 rounded-full border-5 ${
<<<<<<< HEAD
                  isCurrent
                    ? "bg-secondary border-white"
=======
                  isCurrent 
                    ? "bg-secondary border-white" 
                    : isCompleted 
                    ? "bg-primary border-white" 
>>>>>>> 7bc83d975778921ad1849f9017975fcc9752694c
                    : "bg-primary border-white"
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

<<<<<<< HEAD
export default ProgressSection;
=======
export default ProgressStatus;
>>>>>>> 7bc83d975778921ad1849f9017975fcc9752694c
