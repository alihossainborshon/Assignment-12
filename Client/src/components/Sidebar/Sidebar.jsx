import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useRole } from "../../hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import { TouristMenu } from "./Menu/TouristMenu";
import { GuideMenu } from "./Menu/GuideMenu";
import { AdminMenu } from "./Menu/AdminMenu";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { TiThMenu } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";

export const Sidebar = () => {
  const { logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
  const navigate = useNavigate();

  const handleToggle = () => setActive(!isActive);

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Logout failed. Try again.");
    }
  };

  return (
    <div>
      {/*  Mobile Navbar */}
      <div className="bg-white text-gray-900 flex justify-between items-center md:hidden px-4 py-3 shadow-sm border-b border-gray-200">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="w-9 h-9 rounded-xl shadow-sm border border-gray-300"
            />
            <span className="text-lg font-semibold text-[#0d389d]">BD Travel</span>
          </div>
        </Link>
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
        >
          <TiThMenu size={28} className="text-[#0d389d]" />
        </button>
      </div>

      {/*  Sidebar */}
      <div
        className={`z-40 fixed flex flex-col h-screen justify-between w-72 shadow-xl border-r border-gray-200 px-6 py-6 transform
        ${isActive ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition duration-300 ease-in-out bg-white rounded-r-3xl`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center py-4 rounded-xl bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] shadow-md text-white">
          <Link to="/" className="flex flex-col items-center gap-1">
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 rounded-xl shadow hover:scale-105 transition duration-300"
            />
            <p className="text-lg font-semibold tracking-wide">BD Travel</p>
            <span className="text-[11px] opacity-70 tracking-wide">
              Explore Bangladesh
            </span>
          </Link>
        </div>

        {/* Dynamic Menu (scrollable, scrollbar hidden) */}
        <div className="flex-1 mt-4 overflow-y-auto no-scrollbar">
          <nav className="flex flex-col gap-2 text-[15px] font-medium">
            {role === "tourist" && <TouristMenu />}
            {role === "guide" && <GuideMenu />}
            {role === "admin" && <AdminMenu />}

            {!role && (
              <p className="text-sm text-gray-500 text-center">Loading menu...</p>
            )}
          </nav>
        </div>

        {/* Logout section always bottom */}
        <div className="pt-3 border-t border-gray-200">
          <button
            onClick={handleLogOut}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 text-white rounded-xl bg-gradient-to-r from-[#0a2d65] via-[#0d389d] to-[#0f172a] hover:opacity-90 active:scale-95 transition shadow-md"
          >
            <FiLogOut size={18} />
            <span className="font-medium">Log Out</span>
          </button>
          <p className="text-center text-xs text-gray-400 mt-3 tracking-wide">
            © {new Date().getFullYear()} BD Travel
          </p>
        </div>
      </div>
    </div>
  );
};
