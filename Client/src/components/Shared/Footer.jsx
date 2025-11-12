import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Google } from "./Google";

export const Footer = () => {
  return (
    <footer className="w-11/12 mx-auto bg-gradient-to-r from-[#042a84] via-[#002256] to-[#000819] backdrop-blur-2xl text-gray-300 px-6 py-10 mt-16 ">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-3 gap-10 w-full">
          {/* Left: Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="logo"
                className="w-16 h-16 object-cover rounded-xl shadow-md"
              />
              <div>
                <h1 className="text-3xl font-marcellus font-bold text-white">
                  BD Travel
                </h1>
                <p className="text-sm text-gray-400">Explore Bangladesh</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Discover the hidden beauty of Bangladesh. Let’s explore together!
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold font-marcellus text-white border-b border-gray-700 pb-1 inline-block mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/community", label: "Community" },
                { path: "/aboutUs", label: "About Us" },
                { path: "/trips", label: "Trips" },
              ].map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-base font-medium transition-all duration-300 ${
                        isActive
                          ? "text-[#ffeb3b] border-b border-[#ffeb3b]"
                          : "text-gray-300 hover:text-[#ffeb3b]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social / Google */}
          <div className="flex flex-col items-center  gap-3">
            <h3 className="text-lg font-marcellus font-semibold text-white border-b border-gray-700 pb-1 inline-block">
              Connect With Us
            </h3>
            <Google />
          </div>
        </div>

        {/* Divider */}
        <div className="w-1/2  border-2 border-gray-400 my-4"></div>

        {/*  Bottom Text  */}
        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#ffeb3b] font-semibold">BD Travel</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};
