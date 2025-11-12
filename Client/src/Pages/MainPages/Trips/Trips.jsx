import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "./../../../components/Shared/LoadingSpinner";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { PackageCard } from "./../../../components/Shared/PackageCard";
import logo from "../../../assets/logo.png";

export const Trips = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/packages");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError || packages.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No trips available or failed to load.
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = packages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="text-center mb-12 space-y-4">
        {/* Header */}
        <h1 className="flex items-center justify-center gap-4">
          <img src={logo} alt="logo" className="w-12" />
          <span className="text-4xl font-bold font-dancing text-gradient text-white bg-gradient-to-r from-blue-700 via-blue-900 to-black px-6 py-2 rounded-full">
            All Trips
          </span>
        </h1>
        {/* Paragraph below header */}
        <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
          Explore our exclusive travel packages and discover the beauty of
          Bangladesh with{" "}
          <span className="font-semibold text-blue-700">BD Travel</span>.
          Adventure, culture, and unforgettable experiences await you!
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentPackages.map((item) => (
          <PackageCard key={item._id} item={item} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-blue-900 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
