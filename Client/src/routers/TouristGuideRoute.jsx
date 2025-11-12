import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useRole } from "../hooks/useRole";
import { LoadingSpinner } from "../components/Shared/LoadingSpinner";
import PropTypes from "prop-types";

export const TouristGuideRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  if (role === "tourist" || role === "guide") {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
};

TouristGuideRoute.propTypes = {
  children: PropTypes.element,
};