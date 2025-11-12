import React from "react";
import { Link } from "react-router-dom";

export const PackageCard = ({ item }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* /image */}
      <div className="overflow-hidden rounded-t-3xl">
        <img
          src={item.image}
          alt={item.spotName}
          className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-3">
        {/* spot name */}
        <h3 className="text-2xl font-bold font-marcellus text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
          {item.spotName}
        </h3>

        <p className="text-sm text-gray-500">Category: {item.category}</p>
        <p className="text-lg font-semibold text-orange-500">
          ৳ {item.price.toLocaleString()}
        </p>

        <Link
          to={`/viewDetails/${item._id}`}
          state={{ packageData: item }}
          className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl hover:from-indigo-500 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
