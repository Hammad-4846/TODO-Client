import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RequireUser() {
  const localToken = localStorage.getItem("todoAccessToken");
  return localToken ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireUser;
