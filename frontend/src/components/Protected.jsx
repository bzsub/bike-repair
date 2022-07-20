import { React, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Protected = ({ children }) => {
  const { token, user } = useAuth();
  
  const location = useLocation();

  return (
    <div>
      {
        token && user.entity === "shop" && location.pathname === "/book" ? (
          <Navigate to={"/repairlist"} />
        ) : !token ? (
          <Navigate to={"/"} />
        ) : !user.userId && location.pathname !== "/register" ? (
          <Navigate to={"/register"} />
        ) : (
          children
        )
      }
    </div>
  );
};

export default Protected;
