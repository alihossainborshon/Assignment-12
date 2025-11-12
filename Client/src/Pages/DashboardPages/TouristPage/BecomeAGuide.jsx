import { useContext, useState } from "react";
import { BecomeAGuideModal } from "../../../components/Modal/BecomeAGuideModal";
import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

export const BecomeAGuide = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const requestHandler = async () => {
    try {
      await axiosSecure.patch(`/users/${user?.email}`, formData); 
      toast.success("Successfully Applied to become a Tour Guide 👍");
      navigate("/dashboard/touristProfile");
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong 👊");
    } finally {
      closeModal();
      setFormData({ title: "", reason: "", cvLink: "" }); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg transform transition-transform hover:scale-102 duration-300"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700 drop-shadow-lg">
          Join as a Tour Guide
        </h2>

        {/* Application Title */}
        <label className="block mb-4">
          <span className="block font-semibold mb-1 text-gray-700">Application Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-gradient-to-r focus:ring-2 focus:ring-gradient-to-r focus:ring-indigo-500 transition-all outline-none shadow-sm"
          />
        </label>

        {/* Reason */}
        <label className="block mb-4">
          <span className="block font-semibold mb-1 text-gray-700">Why do you want to be a Tour Guide?</span>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-gradient-to-r focus:ring-2 focus:ring-gradient-to-r focus:ring-indigo-500 transition-all outline-none shadow-sm resize-none h-28"
          />
        </label>

        {/* CV Link */}
        <label className="block mb-6">
          <span className="block font-semibold mb-1 text-gray-700">CV Link</span>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            placeholder="https://yourcv.com"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-gradient-to-r focus:ring-2 focus:ring-gradient-to-r focus:ring-indigo-500 transition-all outline-none shadow-sm"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow-lg transform transition-all hover:scale-105 hover:from-green-500 hover:to-green-700"
        >
          <FaPaperPlane />
          Submit Application
        </button>
      </form>

      {/* Premium Modal */}
      <BecomeAGuideModal
        closeModal={closeModal}
        isOpen={isOpen}
        requestHandler={requestHandler}
      />
    </div>
  );
};
