import React from "react";
import { MenuItem } from "./MenuItem";
import {
  FaUserCog,
  FaPlusSquare,
  FaUsersCog,
  FaClipboardList,
} from "react-icons/fa";

export const AdminMenu = () => {
  return (
    <div className="flex flex-col space-y-1 mt-4">
      <h2 className="text-lg font-dancing font-bold text-purple-600 mb-2 pl-4 tracking-wide uppercase">
        Admin  Dashboard
      </h2>
      {/* Manage Profile */}
      <MenuItem
        icon={FaUserCog}
        label="Manage Profile"
        address="/dashboard/adminProfile"
      />

      {/* Add Package */}
      <MenuItem
        icon={FaPlusSquare}
        label="Add Package"
        address="/dashboard/addPackage"
      />

      {/* Manage Users */}
      <MenuItem
        icon={FaUsersCog}
        label="Manage Users"
        address="/dashboard/manageUsers"
      />

      {/* Manage Candidates */}
      <MenuItem
        icon={FaClipboardList}
        label="Manage Candidates"
        address="/dashboard/manageCandidates"
      />
    </div>
  );
};
