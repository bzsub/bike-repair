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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/repair/:id" element={<Repair />} />

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
