import ProfessionSection from "./sections/ProfessionSection";
import ConsultationSection from "./sections/ConsultationSection";
import ProsedurSection from "./sections/ProsedurSection";
import PklSection from "./sections/PklSection";
import VideoAndTemplateSection from "./sections/VideoAndTemplateSection";

const Information = () => {
  return (
    <main className="flex flex-col">
      <PklSection />
      <ProsedurSection />
      <VideoAndTemplateSection />
      <ProfessionSection />
      <ConsultationSection />
    </main>
  );
};

export default Information;
