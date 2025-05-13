import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

const PklApplicationSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/pengajuan");
  };

  return (
    <section className="flex flex-col items-center justify-center h-full mb-22 py-4 bg-white">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Apakah anda ingin mengajukan PKL?</h2>
      <Button className="bg-success cursor-pointer" onClick={handleButtonClick}>
        Ajukan Permohonan PKL
      </Button>
    </section>
  );
};

export default PklApplicationSection;
