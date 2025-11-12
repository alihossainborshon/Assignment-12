import React from "react";
import { MenuItem } from "./MenuItem";
import { FaUserCog, FaSuitcaseRolling, FaShoppingBag, FaPenNib, FaImages, FaUserTie } from "react-icons/fa";

export const TouristMenu = () => {
  return (
    <div className="flex flex-col space-y-1 mt-4">
      <h2 className="text-lg font-dancing font-bold text-purple-600 mb-2 pl-4 tracking-wide uppercase">
      Tourist Dashboard
      </h2>

      <MenuItem
        icon={FaUserCog}
        label="Manage Profile"
        address="/dashboard/touristProfile"
      />
      <MenuItem
        icon={FaSuitcaseRolling}
        label="My Bookings"
        address="/dashboard/myBookings"
      />
      <MenuItem
        icon={FaShoppingBag}
        label="My Orders"
        address="/dashboard/myOrder"
      />
      <MenuItem
        icon={FaPenNib}
        label="Add Story"
        address="/dashboard/addStory"
      />
      <MenuItem
        icon={FaImages}
        label="Manage Stories"
        address="/dashboard/manageStories"
      />
      <MenuItem
        icon={FaUserTie}
        label="Become a Guide"
        address="/dashboard/becomeAGuide"
      />
    </div>
  );
};
