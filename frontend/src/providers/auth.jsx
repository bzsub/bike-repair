import { React, useState, useContext, createContext, useEffect } from "react";
import http from "axios";
import jwt from "jwt-decode";
import { todoApi } from "../api/todoApi";
import config from "../app.config";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const { post } = todoApi();

  const auth = () => {
    const googleBaseUrl = config.google_base_url;

    const searchParams = new URLSearchParams();
    searchParams.append("response_type", "code");
    searchParams.append("client_id", config.google_client_id);
    searchParams.append("redirect_uri", window.location.origin + "/callback");
    searchParams.append("scope", "openid");
    searchParams.append("prompt", "select_account");

    const completeUrl = googleBaseUrl + "?" + searchParams.toString();
    window.location.href = completeUrl;
  };

  const login = async (code, provider) => {
    try {
      const response = await http.post(config.todo_api + "/user/login", {
        code,
        provider,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
    } catch (err) {
      console.log(err);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const register = async (username) => {
    const response = await post("user/create", { username });
    if (response?.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
    }
  };

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");
    if (tokenInStorage) {
      setToken(tokenInStorage);
      setUser(jwt(tokenInStorage));
    }

    // eslint-disable-next-line
  }, []);

  return <AuthContext.Provider value={{ token, user, auth, logout, login, register }}>{children}</AuthContext.Provider>; // provide value for my context
};

// custom hook bro
const useAuth = () => {
  const context = useContext(AuthContext); // read the context and subscribe to its changes
  if (!context) throw new Error("add AuthProvider to route"); // dev help only
  return context;
};

export { AuthProvider, useAuth };
