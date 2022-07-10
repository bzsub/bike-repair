import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";


//Home is now our login page
const Home = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

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
