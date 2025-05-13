import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom"; 

const PklSection = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/info'); 
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-50 py-12 bg-primary text-white">
      <div className="flex-shrink-0 mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-4">Apa itu PKL?</h2>
        <img src="/pkl.png" alt="Illustration" className="w-full max-w-[300px] rounded-lg" />
      </div>
      <div className="flex flex-col items-start md:w-2xl">
        <p className="text-md text-gray-300 mb-6 border-2 border-secondary p-4 rounded-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
          laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </p>
        <Button variant="secondary" className="py-3 px-8 cursor-pointer" onClick={handleButtonClick}>
          Informasi Selengkapnya <span className="ml-2 text-md">→</span>
        </Button>
      </div>
    </section>
  );
};

export default PklSection;
