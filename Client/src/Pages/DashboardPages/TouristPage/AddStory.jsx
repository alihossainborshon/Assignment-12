import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../apis/Utils";

export const AddStory = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    const uploadedUrls = [];
    for (const file of files) {
      const url = await imageUpload(file);
      uploadedUrls.push(url);
    }
    setImages((prev) => [...prev, ...uploadedUrls]);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text || images.length === 0)
      return alert("All fields required");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/stories`,
        { title, text, images },
        { withCredentials: true }
      );
      navigate("/dashboard/manageStories");
    } catch (err) {
      alert("Failed to add story" + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold pb-12 text-center text-purple-700 drop-shadow-md">
        Add New Story
      </h2>
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-xl p-3 transition-all duration-200 outline-none shadow-sm"
          />
          <textarea
            placeholder="Write your story..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-xl p-3 transition-all duration-200 outline-none shadow-sm resize-none h-32"
          ></textarea>
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 w-max transition-all">
              Upload Images
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {loading && (
              <p className="text-purple-600 font-medium">Uploading images...</p>
            )}
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-2">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-lg border border-purple-200 shadow-sm"
                  />
                  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition">
                    ✕
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-4 text-xl font-extrabold text-white rounded-2xl 
             bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 
             hover:from-pink-600 hover:via-purple-700 hover:to-indigo-600 
             shadow-xl transform"
          >
            Add Story
          </button>
        </form>
      </div>
    </div>
  );
};
