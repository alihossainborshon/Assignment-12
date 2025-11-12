import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import { StoryDeleteModal } from "../../../components/Modal/StoryDeleteModal";

export const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  const navigate = useNavigate();

  // Fetch stories
  const fetchStories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/stories`,
        {
          withCredentials: true,
        }
      );
      setStories(data);
    } catch (err) {
      toast.error("Failed to load stories" + err.message);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Open delete modal
  const handleDeleteClick = (story) => {
    setStoryToDelete(story);
    setDeleteModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/stories/${storyToDelete._id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Story deleted successfully!");
      setStories((prev) => prev.filter((s) => s._id !== storyToDelete._id));
      setDeleteModalOpen(false);
      setStoryToDelete(null);
    } catch (err) {
      toast.error("Failed to delete story" + err.message);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <h2 className="text-4xl font-bold py-10 text-center text-purple-700 drop-shadow-md">
        Manage Your Stories
      </h2>

      {stories.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No stories found 😔</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Motion.div
              key={story._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl overflow-hidden relative"
            >
              {story.images && story.images.length > 0 ? (
                <div
                  className={`grid p-2 ${
                    story.images.length === 1
                      ? "grid-cols-1"
                      : story.images.length === 2
                      ? "grid-cols-2"
                      : story.images.length <= 4
                      ? "grid-cols-2 grid-rows-2"
                      : "grid-cols-3"
                  } gap-2`}
                >
                  {story.images.slice(0, 6).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={story.title}
                      className={`object-cover w-full ${
                        story.images.length === 1
                          ? "h-64"
                          : story.images.length === 2
                          ? "h-48"
                          : "h-40"
                      } rounded-lg`}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-400 italic">
                  No image uploaded
                </div>
              )}

              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button
                  onClick={() => navigate(`/updateStory/${story._id}`)}
                  className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteClick(story)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {story.text.slice(0, 100)}...
                </p>

                <div className="flex items-center gap-3 mt-4 border-t pt-3">
                  <img
                    src={story.author?.photo}
                    alt={story.author?.name}
                    className="w-10 h-10 rounded-full border-2 border-indigo-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {story.author?.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {story.author?.role}
                    </p>
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}

      {/* ==== Delete Modal ==== */}
      <StoryDeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        handleConfirm={handleConfirmDelete}
        title={storyToDelete?.title}
      />
    </div>
  );
};
