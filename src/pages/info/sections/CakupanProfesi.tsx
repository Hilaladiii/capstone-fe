import { useState } from "react";

const CakupanProfesi = () => {
  const images: string[] = [
    "/cakupan-profesi-1.png",
    "/cakupan-profesi-2.png",
    "/cakupan-profesi-3.png",
    "/cakupan-profesi-4.png",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNextImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();  
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();  
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToPage = (index: number, e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();  
    setCurrentIndex(index);
  };

  return (
    <section className="flex flex-col w-full h-full justify-center bg-primary px-10 py-18">
      <div className="pl-62 mb-6 text-start text-secondary text-3xl font-bold">Cakupan Profesi SI</div>
      <div className="rounded-[30px] w-full max-w-[900px] mx-auto relative flex justify-center items-center">
        <img src={images[currentIndex]} alt="Illustration" className="w-full max-w-[900px] mb-8" />
      </div>

      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base justify-center">
          <li>
            <button
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-primary border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={goToPreviousImage}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {images.map((_, index) => (
            <li key={index}>
              <button
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                  currentIndex === index
                    ? "text-blue-600 border-blue-300 bg-blue-50"
                    : ""
                }`}
                onClick={(e) => goToPage(index, e)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-primary border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={goToNextImage}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default CakupanProfesi;
