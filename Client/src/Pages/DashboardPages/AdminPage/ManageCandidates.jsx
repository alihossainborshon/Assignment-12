import React from "react";
import { useAxiosSecure } from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: candidates = [], isLoading, refetch } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-candidates");
      return res.data;
    },
  });

  const handleAction = async (email, action) => {
    try {
      await axiosSecure.patch(`/manage-candidates/${email}`, { action });
      toast.success(`User ${action}d successfully`);
      refetch();
      navigate("/dashboard/adminProfile");
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700 drop-shadow-md">
        Manage Tour Guide Candidates ({candidates.length})
      </h2>

      {candidates.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          No candidates found!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Reason</th>
                <th className="py-3 px-4 text-left">CV</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr
                  key={c._id}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">{i + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-700">{c.email}</td>
                  <td
                    className="py-3 px-4 max-w-xs truncate"
                    title={c.guideApplication?.title}
                  >
                    {c.guideApplication?.title}
                  </td>
                  <td
                    className="py-3 px-4 max-w-xs truncate"
                    title={c.guideApplication?.reason}
                  >
                    {c.guideApplication?.reason}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={c.guideApplication?.cvLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline"
                    >
                      View CV
                    </Link>
                  </td>
                  <td className="py-6 px-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleAction(c.email, "approve")}
                      className="flex-1 py-2 px-3 text-sm font-semibold rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white transition-transform duration-200 hover:scale-105"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(c.email, "reject")}
                      className="flex-1 py-2 px-3 text-sm font-semibold rounded-xl shadow-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white transition-transform duration-200 hover:scale-105"
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
    </div>
  );
};
