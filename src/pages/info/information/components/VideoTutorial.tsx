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
    <div className="flex flex-col w-1/2 items-start">
      <div className="mb-8 text-start text-black text-xl font-bold pl-20">Video Tutorial</div>
      <div className="bg-black-3 rounded-[30px] w-full max-w-[568px] mx-auto h-[363px] relative flex justify-center items-center">
        <video
          ref={videoRef}
          className="w-full max-w-[538px] h-[333px] rounded-[30px] object-cover"
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
    </div>
  );
};

export default VideoTutorial;
