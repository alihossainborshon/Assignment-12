import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { LoadingSpinner } from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useRole } from "../hooks/useRole";

export const TouristRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;
  if (user && role === "tourist") {
    return children;
  }

  return <Navigate to="/dashboard/touristProfile" replace />;
};

TouristRoute.propTypes = {
  children: PropTypes.element,
};
