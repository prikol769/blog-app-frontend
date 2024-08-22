const Home = () => {
  return (
    <section>
      <div className="relative">
        <img src="hero.png" alt="hero" />
        <div className="bg-white p-[40px] w-[680px] rounded-xl absolute bottom-[-64px] left-[64px] shadow-[0_12px_24px_-6px_rgba(24,26,42,0.12)]">
          <div className="bg-[#4B6BFB] px-[10px] py-[4px] text-white rounded-md text-sm w-[90px]">
            Technology
          </div>
          <h1 className="text-[#181A2A] text-[40px] leading-[48px] font-semibold mt-4 mb-6 tracking-wide">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>
          <div className="flex items-center  text-[#97989F]">
            <img src="hero-avatar.png" alt="hero-avatar" />
            <p className="ml-3 mr-5 ">Mykyta Krumalenko</p>
            <p>August 28, 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
