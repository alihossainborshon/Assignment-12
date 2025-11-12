import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { imageUpload } from "../../apis/Utils";
import { LoadingSpinner } from "../Shared/LoadingSpinner";

export const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/stories/${id}`,
          { withCredentials: true }
        );
        setStory(data);
        setTitle(data.title);
        setText(data.text);
        setImages(data.images);
      } catch (err) {
        console.error(err);
      }
      setLoading(false); 
    };
    fetchStory();
  }, [id]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true); 

    const uploadedUrls = [];
    for (const file of files) {
      const url = await imageUpload(file);
      uploadedUrls.push(url);
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/stories/${id}/images`,
        { images: uploadedUrls },
        { withCredentials: true }
      );
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleRemoveImage = async (imgUrl) => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/stories/${id}/images`,
        { data: { imageUrl: imgUrl }, withCredentials: true }
      );
      setImages(images.filter((img) => img !== imgUrl));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/stories/${id}`,
        { title, text },
        { withCredentials: true }
      );
      navigate("/dashboard/manageStories");
    } catch (err) {
      alert("Failed to update story" + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  if (loading || !story)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          Update Story
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Story Title"
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-xl p-3 outline-none shadow-sm transition-all"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your story..."
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-xl p-3 outline-none shadow-sm resize-none h-32 transition-all"
          ></textarea>

          <label className="cursor-pointer bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 w-max transition-all">
            Upload Images
            <input type="file" multiple onChange={handleImageChange} className="hidden" />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-2">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-lg border border-purple-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 text-xl font-extrabold text-white rounded-2xl 
                       bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 
                       hover:from-pink-600 hover:via-purple-700 hover:to-indigo-600 
                       shadow-xl transform "
          >
            Update Story
          </button>
        </form>
      </div>
    </div>
  );
};
