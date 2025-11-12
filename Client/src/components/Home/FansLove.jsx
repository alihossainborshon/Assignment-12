import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import logo from "../../assets/logo.png";

export const FansLove = () => {
  const axiosPublic = useAxiosPublic();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/all-stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Error fetching stories:", err));
  }, [axiosPublic]);

  return (
    <div className="relative overflow-visible pt-20">
      {/* Section Header */}
      <div className="text-center space-y-6 pb-10">
        <h1 className="flex items-center justify-center gap-4">
          <img src={logo} alt="logo" className="w-12" />
          <p className="text-4xl font-dancing font-semibold text-[#d8d8dd] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] px-6 py-1 rounded-full">
            Fans Love Their Journeys
          </p>
        </h1>
      </div>

      {/* Outer Swiper */}
      <div className="relative px-10 overflow-visible">
        <Swiper
          style={{
            "--swiper-navigation-color": "#34225e",
            "--swiper-pagination-color": "#34225e",
          }}
          slidesPerView={1}
          spaceBetween={25}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 2, spaceBetween: 35 },
          }}
          modules={[Pagination, Navigation]}
          className="outer-swiper"
        >
          {stories.map((story) => (
            <SwiperSlide key={story._id}>
              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row gap-6 mb-10">
                {/* Inner Swiper for images */}
                <div className="w-full sm:w-1/2 h-56 sm:h-64 rounded-xl overflow-hidden relative">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="inner-swiper h-full w-full"
                  >
                    {story.images?.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={story.title}
                          className="w-full h-full object-cover rounded-xl border-2 border-transparent"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Story Texts */}
                <div className="w-full sm:w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2c3e50] mb-3 hover:text-[#1abc9c] transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {story.text?.length > 150
                        ? story.text.slice(0, 150) + "..."
                        : story.text}
                    </p>
                  </div>

                  {/* Author Section */}
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={story.author?.photo}
                      alt={story.author?.name}
                      className="w-12 h-12 rounded-full border-2 border-[#ff9800] object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-[#2c3e50]">
                        {story.author?.name}
                      </h4>
                      <p className="text-xs text-gray-500 capitalize">
                        {story.author?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
