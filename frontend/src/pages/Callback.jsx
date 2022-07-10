import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Callback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loginWithCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code) {
        await login(code, "google");
        navigate("/profile");
      }
    };
    loginWithCode();
    // eslint-disable-next-line
  }, []);

  return <div>Callback</div>;
};

export default Callback;
