import { React, useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Profile = () => {
  const { token } = useAuth();

  return (
    <div>
      <p>{token ? "Logged in" : "Anonymus"}</p>
    </div>
  );
};

export default Profile;
