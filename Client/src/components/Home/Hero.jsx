import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import logoHero from "../../assets/logo.png";

import video1 from "../../assets/Travel Shorts/CoxsBazar.mp4";
import video2 from "../../assets/Travel Shorts/SajekValley.mp4";
import video3 from "../../assets/Travel Shorts/Sundarban.mp4";
import video4 from "../../assets/Travel Shorts/ShadaPathor.mp4";
import video5 from "../../assets/Travel Shorts/TeaGarden.mp4";

export const Hero = () => {
  const videos = [video1, video2, video3, video4, video5];

  return (
    <div className="w-full min-h-screen flex items-center overflow-hidden py-[clamp(2rem,5vw,6rem)]">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-[clamp(1rem,4vw,6rem)] gap-[clamp(2rem,4vw,5rem)]">
        {/* Left Text Section */}
        <div className="w-full lg:w-1/3 space-y-[clamp(1rem,2vw,2.5rem)] text-center lg:text-left">
          <div className="inline-flex items-center gap-3 font-dancing text-[clamp(1rem,2vw,1.5rem)] font-semibold text-[#d8d8dd] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] px-6 py-1 rounded-full">
            <p>Know Before You Go</p>
            <img
              className="w-[clamp(1.5rem,3vw,2.5rem)] object-contain"
              src={logoHero}
              alt="logo"
            />
          </div>

          <h2 className="font-oleo font-bold text-[clamp(1.8rem,3.5vw,3.8rem)] leading-tight text-[#0f172a]">
            Traveling with{" "}
            <span className="bg-gradient-to-r from-[#2453c0] to-[#082b62] bg-clip-text text-transparent">
              BD Travel
            </span>{" "}
            opens the door to creating memories and exploring Bangladesh.
          </h2>
        </div>

        {/* Right Video Swiper Section */}
        <div className="w-full lg:w-2/3">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {videos.map((vid, index) => (
              <SwiperSlide key={index}>
                <div className="relative rounded-2xl overflow-hidden">
                  <video
                    src={vid}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-[clamp(220px,28vw,420px)] object-cover rounded-2xl border-[3px] border-[#2926de]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
