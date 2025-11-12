import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

export const BookingFormSection = ({ pkg = {}, guides = [] }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [tourDate, setTourDate] = useState(new Date());
  const [selectedGuideId, setSelectedGuideId] = useState("");
  const [touristsCount, setTouristsCount] = useState(1);

  const totalPrice = (pkg?.price || 0) * touristsCount;
  const selectedGuide = guides.find((g) => g._id === selectedGuideId);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) return Swal.fire("Please log in to book a tour!");
    if (!selectedGuide) return Swal.fire("Please select a tour guide!");

    const bookingData = {
      packageName: pkg?.spotName || pkg?.title,
      packagePrice: pkg?.price || 0,
      totalPrice,
      guideName: selectedGuide.name,
      guideEmail: selectedGuide.email,
      tourDate,
      touristsCount,
      touristName: user.displayName,
      touristEmail: user.email,
      touristPhoto: user.photoURL,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data.insertedId) {
        // Booking success → role refresh + navigate
        Swal.fire("Success!", "Booking created successfully!", "success").then(
          () => {
            // Refetch role query to get updated role
            queryClient.invalidateQueries(["role", user.email]);
            navigate("/dashboard/myBookings");
          }
        );
      } else {
        Swal.fire("Error!", "Failed to create booking", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <section className="my-12 flex flex-col md:flex-row gap-8 bg-white p-8 rounded-3xl shadow-xl">
      {/* Left Image */}
      <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={pkg.image || pkg.imgURL}
          alt={pkg.spotName || "Tour Package"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 p-8 bg-white rounded-2xl shadow-lg flex flex-col space-y-6">
        <p
          className="text-4xl font-dancing font-semibold text-center text-white py-3 rounded-xl shadow-md 
          bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#0ea5e9]"
        >
          Book This Tour
        </p>

        <form onSubmit={handleBooking} className="space-y-4">
          {/* Fields */}
          {[
            { label: "Your Name", value: user?.displayName, readOnly: true },
            { label: "Email", value: user?.email, readOnly: true },
            {
              label: "Number of Tourists",
              value: touristsCount,
              type: "number",
              setter: setTouristsCount,
            },
            {
              label: "Total Price",
              value: `$${totalPrice}`,
              readOnly: true,
              type: "text",
              extraClass: "text-blue-700 font-semibold",
            },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col group relative">
              <label className="mb-1 font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                value={field.value}
                readOnly={field.readOnly}
                onChange={
                  field.setter
                    ? (e) => field.setter(parseInt(e.target.value) || 1)
                    : undefined
                }
                className={`input w-full bg-blue-50 border-2 border-transparent rounded-lg px-3 py-2 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent 
                  group-hover:border-blue-400 group-hover:shadow-md ${
                    field.extraClass || ""
                  }`}
              />
            </div>
          ))}

          {/* Tour Date */}
          <div className="flex flex-col group relative">
            <label className="mb-1 font-medium text-gray-700">
              Select Tour Date
            </label>
            <DatePicker
              selected={tourDate}
              onChange={(date) => setTourDate(date)}
              className="input w-full bg-blue-50 border-2 border-transparent rounded-lg px-3 py-2 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent 
                group-hover:border-blue-400 group-hover:shadow-md"
            />
          </div>

          {/* Guide Selection */}
          <div className="flex flex-col group relative">
            <label className="mb-1 font-medium text-gray-700">
              Select a Tour Guide
            </label>
            <select
              value={selectedGuideId}
              onChange={(e) => setSelectedGuideId(e.target.value)}
              required
              className="select w-full bg-blue-50 border-2 border-transparent rounded-lg px-3 py-2 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent hover:border-0
                group-hover:border-blue-400 group-hover:shadow-md mb-2"
            >
              <option value="">Select a Tour Guide</option>
              {guides?.length > 0 ? (
                guides.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))
              ) : (
                <option disabled>No guides available</option>
              )}
            </select>

            {selectedGuide && (
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={selectedGuide.photo}
                  alt={selectedGuide.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <p className="font-medium text-gray-700">
                  {selectedGuide.name}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-gradient-to-r from-[#1240c1] via-[#077eb5] to-[#1341c1] 
              rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl
              hover:from-[#0ea5e9] hover:via-[#1d4ed8] hover:to-[#0ea5e9]"
          >
            Confirm Booking (${totalPrice})
          </button>
        </form>
      </div>
    </section>
  );
};
