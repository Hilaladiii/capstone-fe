import { IoIosPlayCircle } from "react-icons/io";
import { useRef, useState } from "react";

const VideoSection = () => {
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
    <section className="flex flex-col w-full h-150 justify-center bg-primary px-10">
      <div className="mb-8 text-center text-white text-2xl font-bold">Video Tutorial</div>
      <div className="bg-black-3 rounded-[30px] w-full max-w-[733px] mx-auto h-[373px] relative flex justify-center items-center">
        <video
          ref={videoRef}
          className="w-full max-w-[700px] h-[340px] rounded-[30px] object-cover"
          controls
          style={{ display: "block" }}
          onPause={handlePause} 
          onPlay={() => setIsPlaying(true)} 
        >
          <source src="/video-tutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <IoIosPlayCircle
            className="absolute text-white opacity-80 w-14 h-14 cursor-pointer"
            onClick={handlePlayClick}
          />
        )}
      </div>
    </section>
  );
};

export default VideoSection;
