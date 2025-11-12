import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Parallax } from "react-parallax";

import image1 from "../../assets/banner/ban1.jpg";
import image2 from "../../assets/banner/ban2.jpg";
import image3 from "../../assets/banner/ban3.jpg";
import image4 from "../../assets/banner/ban4.jpg";
import image5 from "../../assets/banner/ban5.jpg";
import image6 from "../../assets/banner/ban6.jpg";

export const Banner = () => {
  const slides = [
    {
      img: image1,
      title: "Saint Martin Island",
      text: "The only coral island of Bangladesh, Saint Martin offers crystal blue waters, white sands, and a serene escape where the ocean whispers peace.",
    },
    {
      img: image2,
      title: "Chattogram Hill Tracts",
      text: "A paradise of rolling hills, waterfalls, and tribal culture — the Chattogram Hill Tracts blend adventure, nature, and serenity in one breathtaking view.",
    },
    {
      img: image3,
      title: "Srimangal Tea Gardens",
      text: "Known as the land of two leaves and a bud, Srimangal’s endless tea gardens and misty mornings paint a picture of calm and timeless beauty.",
    },
    {
      img: image4,
      title: "Kaptai Lake",
      text: "Surrounded by lush green hills, Kaptai Lake glimmers under the sunlight — a haven for peace, boating, and stunning reflections of nature’s charm.",
    },
    {
      img: image5,
      title: "Cox’s Bazar Beach",
      text: "The world’s longest sea beach, Cox’s Bazar welcomes you with golden sands, soothing waves, and sunsets that melt into the endless horizon.",
    },
    {
      img: image6,
      title: "Sundarbans",
      text: "Home to the Royal Bengal Tiger, the Sundarbans is a mysterious mangrove forest where beauty, wilderness, and silence coexist in perfect harmony.",
    },
  ];

  return (
    <div className="w-full pb-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Parallax
              bgImage={slide.img}
              strength={-200}
              bgImageAlt={`banner-${index}`}
            >
              <div className="h-[100vh] flex flex-col items-center justify-center text-center bg-black/50 text-white px-6 md:px-20">
                <h2 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="max-w-3xl text-sm md:text-lg leading-relaxed drop-shadow-md">
                  {slide.text}
                </p>
              </div>
            </Parallax>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
