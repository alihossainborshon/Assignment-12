import React, { useState, useContext } from "react";
import { FaUserEdit } from "react-icons/fa";
import coverImg from "../../../assets/travel/sundorban.png";
import { useRole } from "../../../hooks/useRole";
import { AuthContext } from "../../../providers/AuthProvider";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";
import { UpdateProfileModal } from "../../../components/Modal/UpdateProfileModal";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import logo from "../../../assets/logo.png";

export const GuideProfile = () => {
  const { user } = useContext(AuthContext);
  const [role, isLoadingRole] = useRole();
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  //Fetch guide profile using useQuery
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guide-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user.email}`);
      // sometime data is an array
      return Array.isArray(data)
        ? data.find((u) => u.email === user.email)
        : data;
    },
  });

  if (isLoading || isLoadingRole || !profile) return <LoadingSpinner />;

  // Profile update handler by re starting refetch
  const handleProfileUpdated = () => {
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      {/* Welcome Message */}
      <div className="max-w-4xl font-marcellus w-full mb-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 object-cover rounded-xl"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-lg">
            Welcome, {profile.name}!
          </h1>
        </div>
        <p className="mt-2 text-gray-700 text-lg md:text-xl">
          Manage your guide profile and keep your information up to date.
        </p>
      </div>

      {/* Profile Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-102 transition-transform duration-300">
        {/* Cover Photo */}
        <div className="relative h-64">
          <img
            src={coverImg}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center -mt-20 px-6 pb-8">
          <div className="relative">
            <img
              src={profile.photo}
              alt="profile"
              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Name & Email */}
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm">
            {profile.name}
          </h2>
          <p className="mt-1 text-gray-500 text-lg md:text-xl">
            {profile.email}
          </p>

          {/* Role Badge */}
          <span className="mt-3 px-6 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm md:text-base font-semibold rounded-full shadow-lg">
            {role}
          </span>

          {/* Edit Button */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg transform transition-all hover:scale-105 hover:from-blue-600 hover:to-indigo-700"
              onClick={() => setModalOpen(true)}
            >
              <FaUserEdit size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onProfileUpdated={handleProfileUpdated}
        profile={profile}
      />
    </div>
  );
};
