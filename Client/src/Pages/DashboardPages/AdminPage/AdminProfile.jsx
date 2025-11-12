import React, { useContext, useState } from "react";
import { FaUserTie, FaBoxOpen, FaUsers, FaBookOpen } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";
import { UpdateProfileModal } from "../../../components/Modal/UpdateProfileModal";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import coverImg from "../../../assets/travel/sundorban.png";
import logo from "../../../assets/logo.png";

export const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Admin Stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/admin/stats");
      return data;
    },
    enabled: !!user?.email,
  });

  // Fetch Profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user.email}`);
      return Array.isArray(data)
        ? data.find((u) => u.email === user.email)
        : data;
    },
    enabled: !!user?.email,
  });

  // Update Profile Handler
  const handleProfileUpdated = () => {
    queryClient.invalidateQueries(["admin-profile"]);
    queryClient.invalidateQueries(["admin-stats"]);
  };

  if (statsLoading || profileLoading || !profile) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 font-marcellus">
      {/* Welcome Box */}
      <div className="max-w-4xl w-full mb-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <img src={logo} alt="logo" className="w-16 h-16 object-cover" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-lg">
            Welcome Admin, {profile?.name}!
          </h1>
        </div>
        <p className="mt-2 text-gray-700 text-lg md:text-xl">
          Manage platform statistics and update your profile information.
        </p>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-visible transition-transform duration-300">
        {/* Cover Image */}
        <div className="relative h-64">
          <img
            src={coverImg}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center -mt-20 pb-10 px-6">
          <div className="relative">
            <img
              src={profile?.photo}
              alt="Admin Profile"
              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            {profile?.name}
          </h2>
          <p className="text-gray-600 text-lg">{profile?.email}</p>

          <span className="mt-3 px-6 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md text-sm font-semibold">
            {profile?.role || "admin"}
          </span>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">
        {/* Total Payment */}
        <div className="p-6 rounded-xl shadow-xl bg-blue-200 flex flex-col items-center gap-3 text-center">
          <FaBangladeshiTakaSign size={40} className="opacity-80" />
          <h2 className="text-lg font-medium">Total Payment</h2>
          <p className="text-3xl font-bold">{stats?.totalPayment || 0}</p>
        </div>

        {/* Total Tour Guides */}
        <div className="p-6 rounded-xl shadow-xl bg-green-200 flex flex-col items-center gap-3 text-center">
          <FaUserTie size={40} className="opacity-80" />
          <h2 className="text-lg font-medium">Total Tour Guides</h2>
          <p className="text-3xl font-bold">{stats?.totalGuides || 0}</p>
        </div>

        {/* Total Packages */}
        <div className="p-6 rounded-xl shadow-xl bg-yellow-200 flex flex-col items-center gap-3 text-center">
          <FaBoxOpen size={40} className="opacity-80" />
          <h2 className="text-lg font-medium">Total Packages</h2>
          <p className="text-3xl font-bold">{stats?.totalPackages || 0}</p>
        </div>

        {/* Total Clients */}
        <div className="p-6 rounded-xl shadow-xl bg-purple-200 flex flex-col items-center gap-3 text-center">
          <FaUsers size={40} className="opacity-80" />
          <h2 className="text-lg font-medium">Total Clients</h2>
          <p className="text-3xl font-bold">{stats?.totalClients || 0}</p>
        </div>

        {/* Total Stories */}
        <div className="p-6 rounded-xl shadow-xl bg-red-200 flex flex-col items-center gap-3 text-center">
          <FaBookOpen size={40} className="opacity-80" />
          <h2 className="text-lg font-medium">Total Stories</h2>
          <p className="text-3xl font-bold">{stats?.totalStories || 0}</p>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <UpdateProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          profile={profile}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
};
