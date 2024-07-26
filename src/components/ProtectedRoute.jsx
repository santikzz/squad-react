import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "@/context/GlobalProvider";


function ProtectedRoute() {
  const { isLoggedIn } = useGlobalContext();
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default ProtectedRoute;
