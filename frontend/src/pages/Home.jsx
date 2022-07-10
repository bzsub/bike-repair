import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../providers/auth";

//Home is now our login page
const Home = () => {
  const navigate = useNavigate();
  const { token, auth, user } = useAuth();

  return (
    <div>
      <h3>Home</h3>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <p>{token ? "Logged in" : "Anonymus"}</p>
    </div>
  );
};

export default Home;
