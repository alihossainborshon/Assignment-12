import React from "react";
import { MenuItem } from "./MenuItem";
import { FaUserCog, FaRoute, FaPlusCircle, FaBookOpen } from "react-icons/fa";

export const GuideMenu = () => {
  return (
    <div className="flex flex-col space-y-1 mt-4">
      <h2 className="text-lg font-dancing font-bold text-purple-600 mb-2 pl-4 tracking-wide uppercase">
        Guide Dashboard
      </h2>
      {/* Manage Profile */}
      <MenuItem
        icon={FaUserCog}
        label="Manage Profile"
        address="/dashboard/guideProfile"
      />

      {/* My Assigned Tours */}
      <MenuItem
        icon={FaRoute}
        label="My Assigned Tours"
        address="/dashboard/myAssignedTours"
      />

      {/* Add Story */}
      <MenuItem
        icon={FaPlusCircle}
        label="Add Story"
        address="/dashboard/addStory"
      />

      {/* Manage Story */}
      <MenuItem
        icon={FaBookOpen}
        label="Manage Stories"
        address="/dashboard/manageStories"
      />
    </div>
  );
};
