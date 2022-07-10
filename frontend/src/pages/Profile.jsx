import { React, useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Profile = () => {
  const { token, user } = useAuth();

  return (
    <div>
      <p>{token ? "Logged in" : "Anonymus"}</p>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
    </div>
  );
};

export default Profile;
