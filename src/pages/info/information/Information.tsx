import FooterLayout from "../../../components/layout/FooterLayout";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import ProfessionSection from "./sections/ProfessionSection";
import ConsultationSection from "./sections/ConsultationSection";
import ProsedurSection from "./sections/ProsedurSection";
import PklSection from "./sections/PklSection";
import VideoAndTemplateSection from "./sections/VideoAndTemplateSection";

const Information = () => {
  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <PklSection />
      <ProsedurSection />
      <VideoAndTemplateSection />
      <ProfessionSection />
      <ConsultationSection />
      <FooterLayout />
    </main>
  );
};

export default Information;
