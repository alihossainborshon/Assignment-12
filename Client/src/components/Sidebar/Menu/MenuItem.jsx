import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 
        ${
          isActive
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
            : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
        }`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-semibold tracking-wide">{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};
