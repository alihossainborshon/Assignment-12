import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";

export const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-orders/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  // Status style generator
  const getStatusStyles = (status) => {
    const s = status?.toString().trim().toLowerCase(); // Clean string
    if (s === "paid" || s === "accepted") {
      return "bg-green-100 text-green-800 border-l-4 border-green-500";
    } else if (s === "in review") {
      return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
    } else if (s === "pending") {
      return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
    } else if (s === "rejected") {
      return "bg-red-100 text-red-800 border-l-4 border-red-500";
    } else {
      return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700 drop-shadow-md">
        My Payments ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          No payments found!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Package</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-900">
                    {order.packageName}
                  </td>

                  <td className="py-3 px-4 text-gray-800 font-semibold flex items-center gap-1">
                    <span className="text-indigo-600 font-bold">৳</span>
                    {order.totalPrice}
                  </td>

                  <td className="py-3 px-4 text-gray-600 font-mono text-sm break-all">
                    {order?.transactionId}
                  </td>

                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {new Date(order.paidAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full font-medium text-sm shadow-sm ${getStatusStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
