import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const PklApplicationSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/pengajuan");
  };

  return (
    <section className="flex flex-col items-center justify-center h-60 bg-white">
      <h2 className="text-xl font-semibold text-black mb-8 text-center">Apakah anda ingin mengajukan PKL?</h2>
      <Button className="bg-secondary text-sm cursor-pointer px-12 py-3" onClick={handleButtonClick}>
        Ajukan Permohonan PKL
      </Button>
    </section>
  );
};

export default PklApplicationSection;
