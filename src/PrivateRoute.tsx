import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./features/login/services/localStorageService";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = getToken();

  if (!token) {
    // Nếu không có token thì redirect về login
    return <Navigate to="/login" replace />;
  }

  return children; // Nếu có token thì cho render
};

export default PrivateRoute;
