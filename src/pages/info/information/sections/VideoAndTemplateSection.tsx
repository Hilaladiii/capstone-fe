import VideoTutorial from "../components/VideoTutorial";
import TemplateLinks from "../components/TemplateLink";

const VideoAndTemplateSection = () => {
  return (
    <section className="w-full g-white px-10 py-16 h-144 flex">
      <div className="flex flex-row gap-10 items-center w-full">
        <VideoTutorial />
        <TemplateLinks />
      </div>
    </section>
  );
};

export default VideoAndTemplateSection;
