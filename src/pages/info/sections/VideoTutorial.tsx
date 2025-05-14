import { IoIosPlayCircle } from "react-icons/io";
import { useRef, useState } from "react";

const VideoTutorial = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true); 
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false); 
    }
  };

  return (
    <section className="flex flex-col w-full h-full justify-center bg-white px-10 py-18">
      <div className="pl-62 mb-6 text-start text-black text-3xl font-bold">Video Tutorial</div>
      <div className="bg-support1 rounded-[30px] w-full max-w-[830px] mx-auto h-[470px] relative flex justify-center items-center">
        <video
          ref={videoRef}
          className="w-full max-w-[800px] h-[440px] rounded-[30px]"
          controls
          style={{ display: "block" }}
          onPause={handlePause} 
          onPlay={() => setIsPlaying(true)} 
        >
          <source src="video-tutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <IoIosPlayCircle
            className="absolute text-white opacity-80 w-24 h-24 cursor-pointer"
            onClick={handlePlayClick}
          />
        )}
      </div>
    </section>
  );
};

export default VideoTutorial;
