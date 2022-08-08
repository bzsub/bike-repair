import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const Navbar = () => {
  const navigate = useNavigate();
  const { auth, token, user, logout } = useAuth();
  const { theme, changeTheme } = useTheme();


  const CssButton = styled(Button)({
    backgroundColor:theme.colorOne,
    color:theme.colorTwo,
    fontWeight:"700",
    fontSize:"1.3rem",
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
      padding:"10px",
      position:"fixed",
      left:"0",
      right:"0",
      top:"0",
      height:"80px",
      zIndex:"5",
      }}>
      <CssButton onClick={() => navigate("/repairlist")} size="small" style={{
      }}>
        repairs
      </CssButton>
      <CssButton onClick={() => navigate("/shopsearch")} size="small">
        shops
      </CssButton>
      { user?.entity === "user" && <CssButton onClick={() => navigate("/book")} size="small">
        book
      </CssButton>
      }
      <CssButton onClick={() => navigate("/profile")} size="small">
        Profile
      </CssButton>
      <FormGroup>
        <CssFormControlLabel control={
          <CssSwitch  
            onClick={changeTheme}   
            checked={theme.name === "dark"}    
          />
        } label={theme.name} />
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
