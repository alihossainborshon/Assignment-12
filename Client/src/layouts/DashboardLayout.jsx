import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 md:ml-72">  
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
