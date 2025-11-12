import React from "react";
import avatarImg from "../../assets/login/profile.png";

export const GuideCard = ({ item, onView }) => {
  const { name, email, image, photo, role } = item || {};

  // Handle image
  let profileImage = image || photo || avatarImg;
  if (photo) {
    profileImage = photo.replace("s96-c", "s400-c");
  }

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 text-center">
      <div className="relative w-40 h-40 mx-auto mt-4 rounded-full p-[3px] bg-gradient-to-r from-[#ff9639] to-[#d21f1f]">
        <div className="rounded-full overflow-hidden w-full h-full bg-white">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover object-center rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-[#0D0842]">{name}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#ff7c01]">Role:</span>{" "}
          {role?.charAt(0).toUpperCase() + role?.slice(1)}
        </p>
        <p className="text-gray-500 text-sm break-all">{email}</p>

        <button
          onClick={onView}
          className="inline-block w-full text-center bg-gradient-to-r from-[#ff7701] to-[#ea2828] text-white py-3 rounded-xl hover:from-[#ea2828] hover:to-[#ff7701] font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};
