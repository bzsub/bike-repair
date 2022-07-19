import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const Navbar = () => {
  const navigate = useNavigate();
  const { auth, token, logout } = useAuth();
  const { theme, changeTheme } = useTheme();


  const CssButton = styled(Button)({
    backgroundColor:theme.colorOne,
    color:theme.colorTwo,
    fontWeight:"700",
  });

  const CssFormControlLabel = styled(FormControlLabel)({
    backgroundColor:theme.colorOne,
    color:theme.colorTwo,
    fontWeight:"700",
  });

  const CssSwitch = styled(Switch)({
    backgroundColor:theme.colorOne,
    color:theme.colorTwo,
    fontWeight:"700",
  });

  

  return (
    <nav className="navbar" style={{
      background:theme.colorOne,
      padding:"10px"
      }}>
      <CssButton onClick={() => navigate("/")} size="small" style={{
      }}>
        Home
      </CssButton>
      <CssButton onClick={() => navigate("/test")} size="small">
        test
      </CssButton>
      <CssButton onClick={() => navigate("/profile")} size="small">
        Profile
      </CssButton>
      
      <CssButton onClick={changeTheme}>
        {theme.name}
      </CssButton>
      <FormGroup>
        <CssFormControlLabel control={
          <CssSwitch  
            onClick={changeTheme}   
            checked={theme.name === "dark"}    
          />
        } label="ola" />
      </FormGroup>
      {token ? (
        <CssButton onClick={logout} size="small">
          Logout
        </CssButton>
      ) : (
        <CssButton onClick={auth} size="small">
          Google login
        </CssButton>
      )}
    </nav>
  );
};

export default Navbar;
