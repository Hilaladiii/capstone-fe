import FooterLayout from "../components/layout/FooterLayout";
import HeaderLayout from "../components/layout/HeaderLayout";
import AnnouncementSection from "../components/sections/home/AnnouncementSection";
import HeroSection from "../components/sections/home/HeroSection";
import PartnerSection from "../components/sections/home/PartnerSection";
import PklApplicationSection from "../components/sections/home/PklApplicationSection";
import PklSection from "../components/sections/home/PklSection";
import ProgressSection from "../components/sections/home/ProgressSection";
import ProsedurSection from "../components/sections/home/ProsedurSection";
import VideoSection from "../components/sections/home/VideoSection";

const Home = () => {
  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <HeroSection />
      <ProgressSection />
      <PklSection />
      <PartnerSection />
      <VideoSection />
      <ProsedurSection/>
      <AnnouncementSection />
      <PklApplicationSection />
      <FooterLayout />
    </main>
  );
};

export default Home;
