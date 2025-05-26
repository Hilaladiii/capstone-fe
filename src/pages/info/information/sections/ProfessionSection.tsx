import { useState } from "react";
import Pagination from "../../../../components/ui/pagination";

const ProfessionSection = () => {
  const images = [
    "/cakupan-profesi-1.png",
    "/cakupan-profesi-2.png",
    "/cakupan-profesi-3.png",
    "/cakupan-profesi-4.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlePageChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="flex flex-row w-full min-h-screen items-center gap-20 justify-center bg-primary px-10 py-18">
      <div className="px-10 py-1 flex items-center text-black bg-white border-secondary border-3 h-fit rounded-full text-lg font-bold">Cakupan Profesi SI</div>
      <div>
        <div className="rounded-[30px] w-full max-w-[900px] mx-auto relative flex justify-center items-center">
          <img src={images[currentIndex]} alt="Illustration" className="w-full max-w-[900px] mb-8" />
        </div>
        <Pagination
          currentIndex={currentIndex}
          total={images.length}
          onPageChange={handlePageChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </section>
  );
};

export default ProfessionSection;
