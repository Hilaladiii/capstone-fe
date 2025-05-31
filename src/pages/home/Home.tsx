import AnnouncementSection from "./sections/AnnouncementSection";
import HeroSection from "./sections/HeroSection";
import PartnerSection from "./sections/PartnerSection";
import PklApplicationSection from "./sections/PklApplicationSection";
import PklSection from "./sections/PklSection";
import ProgressSection from "./sections/ProgressSection";
import ProsedurSection from "./sections/ProsedurSection";
import VideoSection from "./sections/VideoSection";

const Home = () => {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProgressSection />
      <PklSection />
      <PartnerSection />
      <VideoSection />
      <ProsedurSection />
      <AnnouncementSection />
      <PklApplicationSection />
    </main>
  );
};

export default Home;
