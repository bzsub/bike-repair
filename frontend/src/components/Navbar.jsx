import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, token, logout } = useAuth();
  const { theme, changeTheme } = useTheme();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };



  return (
    <nav className="navbar">
      <Button onClick={() => nav("/")} variant="contained" size="small">
        Home
      </Button>
      <Button onClick={() => nav("/test")} variant="contained" size="small">
        test
      </Button>
      <Button onClick={() => nav("/profile")} variant="contained" size="small">
        Profile
      </Button>
      <Button onClick={changeTheme}>
        {theme}
      </Button>
      {token ? (
        <Button onClick={logout} variant="contained" color="secondary" size="small">
          Logout
        </Button>
      ) : (
        <Button onClick={auth} variant="contained" color="info" size="small">
          Google login
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
