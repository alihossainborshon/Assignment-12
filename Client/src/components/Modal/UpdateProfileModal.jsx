import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { imageUpload } from "../../apis/Utils";

export const UpdateProfileModal = ({
  isOpen,
  onClose,
  onProfileUpdated,
  profile,
}) => {
  const { updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(profile?.name || "");
  const [photoPreview, setPhotoPreview] = useState(profile?.photo || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let imageURL = profile?.photo;

      if (selectedImage) {
        imageURL = await imageUpload(selectedImage);
      }

      await updateUserProfile(name, imageURL);

      await axiosSecure.patch(`/users/profile/${profile.email}`, {
        name,
        photo: imageURL,
      });

      toast.success("Profile Updated Successfully!");
      onProfileUpdated();
      onClose();
    } catch (err) {
      toast.error("Failed to update profile", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fade backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all scale-95 animate-modal">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
          Update Profile
        </h2>

        {/* Preview */}
        <div className="flex justify-center">
          <img
            src={photoPreview || "/default-avatar.png"}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-300 shadow-lg"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={profile?.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium mb-1 block">Role</label>
            <input
              type="text"
              value={profile?.role}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload New Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-semibold shadow">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
