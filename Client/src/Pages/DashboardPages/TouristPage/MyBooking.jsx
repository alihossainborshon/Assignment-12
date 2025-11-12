import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import { LoadingSpinner } from "./../../../components/Shared/LoadingSpinner";
import { PackageDeleteModal } from "./../../../components/Modal/PackageDeleteModal";
import { PaymentModal } from "../../../components/Modal/PaymentModal";
import { useNavigate } from "react-router-dom";

export const MyBooking = ({ onBookingCancel }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [payDisabled, setPayDisabled] = useState(false);

  // Helper function to truncate text > 15 chars
  const truncateText = (text, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = async (id) => {
    try {
      await axiosSecure.delete(`/bookings/${id}`);
      toast.success("Booking canceled successfully!");
      refetch();
      setIsModalOpen(false);

      if (onBookingCancel) onBookingCancel();
      navigate("/dashboard/touristProfile");
    } catch {
      toast.error("Failed to cancel booking!");
    }
  };

  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setPayDisabled(
      booking.status === "in review" ||
        booking.status === "accepted" ||
        booking.status === "rejected"
    );
    setIsModalOpen(true);
  };

  const openPaymentModal = (booking) => {
    setSelectedBooking(booking);
    setIsPaymentOpen(true);
  };

  const closeDeleteModal = () => setIsModalOpen(false);
  const closePaymentModal = () => setIsPaymentOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s.includes("accepted"))
      return "bg-green-100 text-green-800 border-l-4 border-green-500";
    if (s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
    if (s.includes("in review"))
      return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
    if (s.includes("rejected"))
      return "bg-red-100 text-red-800 border-l-4 border-red-500";
    return "bg-purple-100 text-purple-800 border-l-4 border-purple-500";
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700 drop-shadow-md">
        My Bookings ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          No bookings found!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Tourist</th>
                <th className="py-3 px-4 text-left">Package</th>
                <th className="py-3 px-4 text-left">Guide</th>
                <th className="py-3 px-4 text-left">Tour Date</th>
                <th className="py-3 px-4 text-left">People</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={booking.touristPhoto}
                      alt={booking.touristName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {truncateText(booking.touristName)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {truncateText(booking.touristEmail)}
                      </p>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-700">
                    {booking.packageName}
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-700">
                      {truncateText(booking.guideName)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {truncateText(booking.guideEmail)}
                    </p>
                  </td>

                  <td className="py-3 px-4">
                    {new Date(booking.tourDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-4">{booking.touristsCount}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    ₹{booking.totalPrice}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full font-medium text-sm shadow-sm whitespace-nowrap ${getStatusStyles(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="py-6 px-4 flex gap-2 justify-center">
                    <button
                      onClick={() => openPaymentModal(booking)}
                      disabled={
                        booking.status === "in review" ||
                        booking.status === "accepted" ||
                        booking.status === "rejected"
                      }
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-xl shadow-lg transition-transform duration-200 ${
                        booking.status === "in review" ||
                        booking.status === "accepted" ||
                        booking.status === "rejected"
                          ? "bg-blue-300 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105"
                      }`}
                    >
                      Pay
                    </button>

                    <button
                      onClick={() => openDeleteModal(booking)}
                      disabled={booking.status === "accepted"}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-xl shadow-lg transition-transform duration-200 ${
                        booking.status === "accepted"
                          ? "bg-red-300 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white hover:scale-105"
                      }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PackageDeleteModal
        isOpen={isModalOpen}
        closeModal={closeDeleteModal}
        handleCancel={handleCancel}
        bookingId={selectedBooking?._id}
        packageName={selectedBooking?.packageName}
        payDisabled={payDisabled}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        closeModal={closePaymentModal}
        bookingInfo={selectedBooking}
        refetch={refetch}
      />
    </div>
  );
};
