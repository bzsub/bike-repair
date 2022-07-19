import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Repair from "./pages/Repair"
import SignUp from "./components/shopSignUp/SignUp";

import { useTheme } from "./providers/theme";


function App() {

  const { theme } = useTheme();

  return (
    <div className="App" 
    style={{
      backgroundColor:theme.colorTwo,
      color:theme.colorOne,
      minHeight:"100vh",
      transition:"background 0.4s ease-in-out"
      }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/repair/:id" element={<Repair />} />

        <Route path="/test" element={<SignUp />} />

        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/register"
          element={
            <Protected>
              <Register />
            </Protected>
          }
        />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </div>
  );
}

export default App;

/*

*/
