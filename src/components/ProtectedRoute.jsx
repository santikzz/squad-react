import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isLoggedIn }) {
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoute;
