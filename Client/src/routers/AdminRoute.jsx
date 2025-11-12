import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { LoadingSpinner } from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useRole } from "../hooks/useRole";

export const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;
  if (user && role === "admin") {
    return children;
  }
  return <Navigate to="/dashboard/AdminProfile" replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};
