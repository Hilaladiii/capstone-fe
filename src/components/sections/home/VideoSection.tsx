const VideoSection = () => {
  return (
    <section className="flex flex-col w-full bg-primary px-10 py-20 h-lvh">
      <div className="text-start mb-10 text-secondary text-3xl px-60 font-bold">
        Video Tutorial
      </div>
      <div className="bg-zinc-600 rounded-[30px] w-full max-w-[900px] mx-auto p-4 relative">
        <video 
          className="w-full h-auto rounded-[30px]" 
          controls
          src="/video-tutorial.mp4" 
        />
      </div>
    </section>
  );
};

export default VideoSection;
