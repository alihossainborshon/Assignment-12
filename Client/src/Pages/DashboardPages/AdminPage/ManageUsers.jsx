import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { UserDeleteModal } from "../../../components/Modal/UserDeleteModal";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

export const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user.email}`);
      return data;
    },
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const res = await axiosSecure.delete(`/user/${selectedUser._id}`);
      if (res.data.success) {
        toast.success(`${selectedUser.name} deleted successfully`);
        refetch();
        closeModal();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user" + error.message);
    }
  };

  const getRoleStyles = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      case "guide":
        return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
      case "tourist":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load users. Try again.
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700 drop-shadow-md">
        Manage Users ({users.length})
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem, idx) => (
                <tr
                  key={userItem._id}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {userItem.name}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {userItem.email}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full font-medium text-sm ${getRoleStyles(
                        userItem.role
                      )}`}
                    >
                      {userItem.role}
                    </span>
                  </td>
                  <td className="py-6 px-4 flex justify-center">
                    <button
                      onClick={() => openModal(userItem)}
                      className="py-2 px-4 text-sm font-semibold rounded-xl shadow-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white transition-transform duration-200 hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <UserDeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        deleteHandler={handleDelete}
        userName={selectedUser?.name}
      />
    </div>
  );
};
