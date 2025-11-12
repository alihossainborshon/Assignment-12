import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import toast from "react-hot-toast";
import avatarImg from "../../assets/login/profile.png";
import { AuthContext } from "../../providers/AuthProvider";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userHasBooking, setUserHasBooking] = useState(false);

  const dropdownRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/role/${user.email}`)
        .then((res) => setRole(res.data?.role || null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, [user, axiosPublic]);

  // Check user bookings
  useEffect(() => {
    if (user?.email && role === "user") {
      axiosPublic
        .get(`/bookings/${user.email}`)
        .then((res) => setUserHasBooking(res.data?.length > 0))
        .catch(() => setUserHasBooking(false));
    } else {
      setUserHasBooking(false);
    }
  }, [user, role, axiosPublic]);

  // logOut
  const handleLogOut = async () => {
    await logOut();
    toast.success("Logged out successfully");
    setIsDropdownOpen(false);
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Dashboard Links
  const dashboardLink =
    role === "admin"
      ? { path: "/dashboard/adminProfile", label: "Dashboard" }
      : role === "guide"
      ? { path: "/dashboard/guideProfile", label: "Dashboard" }
      : role === "tourist"
      ? { path: "/dashboard/touristProfile", label: "Dashboard" }
      : role === "user" && userHasBooking
      ? { path: "/dashboard/myBookings", label: "My Bookings" }
      : null;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/community", label: "Community" },
    { path: "/aboutUs", label: "About Us" },
    { path: "/trips", label: "Trips" },
    dashboardLink,
  ].filter(Boolean);

  const renderLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `text-[16px] font-semibold transition-all duration-300 ${
            isActive
              ? "text-[#3b82f6] border-b-2 border-[#3b82f6]"
              : "text-gray-200 hover:text-[#3b82f6]"
          } ${isMobile ? "block px-3 py-1 rounded-md" : ""}`
        }
      >
        {link.label}
      </NavLink>
    ));

  return (
    <div className="fixed top-0 left-0 right-0 w-11/12 mx-auto z-50">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] bg-opacity-80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-11 h-11 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold font-marcellus text-white tracking-tight leading-none">
                BD Travel
              </h1>
              <span className="text-xs text-gray-300 tracking-wide">
                Explore Bangladesh
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-7">
            {renderLinks()}
          </div>

          {/* Right Avatar */}
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <div className="lg:hidden">
              <TiThMenu
                size={30}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-200 hover:text-[#3b82f6] cursor-pointer transition-colors"
              />
            </div>

            {/* Avatar */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative cursor-pointer"
            >
              <img
                className="rounded-full border-2 border-[#ffffff] object-cover aspect-square w-10 h-10 hover:scale-105 transition-transform duration-300"
                src={user?.photoURL || avatarImg}
                alt="profile"
              />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-6 top-16 bg-white/90 backdrop-blur-md text-gray-800 shadow-lg rounded-xl p-3 w-[60vw] md:w-[180px] animate-fadeIn"
              >
                {user ? (
                  <div
                    onClick={handleLogOut}
                    className="py-2 text-center font-medium rounded-lg hover:bg-[#3b82f6] hover:text-white cursor-pointer transition-all"
                  >
                    Log Out
                  </div>
                ) : (
                  <div className="flex flex-col text-center space-y-2">
                    <Link
                      to="/login"
                      className="py-2 rounded-lg hover:bg-[#3b82f6] hover:text-white transition-all font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="py-2 rounded-lg hover:bg-[#22c55e] hover:text-white transition-all font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pb-2">
            <div className="bg-[#0f172a]/90 backdrop-blur-md p-3 rounded-lg mt-2 space-y-2 shadow-md">
              {renderLinks(true)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
