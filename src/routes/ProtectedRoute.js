import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { Context } from "context/user-context";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(Context);
  const { userInfo } = state;

  return userInfo.user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
