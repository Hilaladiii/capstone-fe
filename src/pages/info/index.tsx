import FooterLayout from "../../components/layout/FooterLayout";
import HeaderLayout from "../../components/layout/HeaderLayout";
import CakupanProfesi from "./sections/CakupanProfesi";
import KonsultasiForm from "./sections/KonsultasiForm";
import PklSection from "./sections/PklSection";
import ProsedurPKL from "./sections/ProsedurPKL";
import TemplateDokument from "./sections/TemplateDokument";
import VideoTutorial from "./sections/VideoTutorial";

const Info = () => {
  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <PklSection />
      <ProsedurPKL />
      <VideoTutorial />
      <TemplateDokument />
      <CakupanProfesi />
      <KonsultasiForm />
      <FooterLayout />
    </main>
  );
};

export default Info;
