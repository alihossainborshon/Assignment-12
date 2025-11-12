import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import { RejectConfirmationModal } from "../../../components/Modal/RejectConformationModal";

export const MyAssignedTours = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch assigned tours
  const { data: assignedTours = [], isLoading } = useQuery({
    queryKey: ["assignedTours", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/assigned-tours/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/assigned-tours/${id}`, {
        status: "accepted",
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Tour accepted successfully!");
      queryClient.invalidateQueries(["assignedTours", user?.email]);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/assigned-tours/${id}`, {
        status: "rejected",
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Tour rejected successfully!");
      queryClient.invalidateQueries(["assignedTours", user?.email]);
    },
    onError: () => {
      toast.error("Failed to reject tour");
    },
  });

  const handleAccept = (id) => {
    acceptMutation.mutate(id);
  };

  const handleRejectClick = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const confirmReject = () => {
    if (selectedTour) {
      rejectMutation.mutate(selectedTour._id);
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case "in review":
        return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
      case "rejected":
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700 drop-shadow-md">
        My Assigned Tours ({assignedTours.length})
      </h2>

      {assignedTours.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          No assigned tours yet!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Tourist</th>
                <th className="py-3 px-4 text-left">Package</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedTours.map((tour, index) => (
                <tr
                  key={tour._id}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">{index + 1}</td>

                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={tour.touristPhoto}
                      alt={tour.touristName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">{tour.touristName}</p>
                      <p className="text-sm text-gray-500">{tour.touristEmail}</p>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-700">{tour.packageName}</td>
                  <td className="py-3 px-4">{new Date(tour.tourDate).toLocaleDateString("en-GB")}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">৳ {tour.totalPrice}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full font-medium text-sm shadow-sm whitespace-nowrap ${getStatusStyles(tour.status)}`}
                    >
                      {tour.status}
                    </span>
                  </td>

                  <td className="py-6 px-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleAccept(tour._id)}
                      disabled={tour.status !== "in review"}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-xl shadow-lg transition-transform duration-200 ${
                        tour.status !== "in review"
                          ? "bg-gray-300 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 text-white"
                      }`}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleRejectClick(tour)}
                      disabled={tour.status === "accepted" || tour.status === "rejected"}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-xl shadow-lg transition-transform duration-200 ${
                        tour.status === "accepted" || tour.status === "rejected"
                          ? "bg-gray-300 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 text-white"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {isModalOpen && (
        <RejectConfirmationModal
          onConfirm={confirmReject}
          onCancel={() => setIsModalOpen(false)}
          packageName={selectedTour?.packageName}
        />
      )}
    </div>
  );
};
