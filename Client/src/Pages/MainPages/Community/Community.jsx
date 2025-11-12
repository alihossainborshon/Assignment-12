import { useEffect, useState } from "react";
import { useAxiosPublic } from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import logo from "../../../assets/logo.png";

export const Community = () => {
  const axiosPublic = useAxiosPublic();
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 6;

  useEffect(() => {
    axiosPublic
      .get("/all-stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Error fetching stories:", err));
  }, [axiosPublic]);

  // Pagination logic
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-base-100">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="flex items-center justify-center gap-4">
          <img src={logo} alt="logo" className="w-12" />
          <span className="text-4xl font-bold font-dancing text-gradient text-white bg-gradient-to-r from-blue-700 via-blue-900 to-black px-6 py-2 rounded-full">
            Community Stories
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the journeys and experiences of our tourists. Share your story
          and inspire others to travel Bangladesh!
        </p>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentStories.map((story) => (
          <div
            key={story._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Story Images Slider */}
            <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
              {story.images?.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="h-full w-full"
                >
                  {story.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={story.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={logo}
                  alt="default"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Story Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                {story.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow">
                {story.text?.length > 150
                  ? story.text.slice(0, 150) + "..."
                  : story.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-4">
                <img
                  src={story.author?.photo || logo}
                  alt={story.author?.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    {story.author?.name || "Anonymous"}
                  </h4>
                  <p className="text-xs text-gray-500 capitalize">
                    {story.author?.role || "Tourist"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? "bg-blue-900 text-white shadow-md scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};
