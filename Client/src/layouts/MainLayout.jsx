import { Outlet } from "react-router-dom";
import { Footer } from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

export const MainLayout = () => {
  return (
    <div className="bg-white max-w-[1920px] mx-auto "> 
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-243px)] w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
