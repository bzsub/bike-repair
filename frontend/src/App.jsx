import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";


import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Repair from "./pages/Repair"
import SignUp from "./components/shopSignUp/SignUp";

import { useTheme } from "./providers/theme";
import ShopSearch from "./pages/ShopSearch";
import Shop from "./pages/Shop";
import RepairList from "./pages/RepairList";

function App() {

  const { theme } = useTheme();

  return (
    <div className="App" 
    style={{
      backgroundColor:theme.colorTwo,
      color:theme.colorOne,
      minHeight:"100vh",
      transition:"background 0.4s ease-in-out",
      paddingBottom:"50px",
      }}>
      <Navbar />
      <Routes>
        <Route path="/repairlist" element={<RepairList />} />
        <Route path="/about" element={<About />} />
        <Route path="/repair/:id" element={<Repair />} />
        <Route path="/shop/:id" element={<Shop />} />

        <Route path="/shopsearch" element={<ShopSearch />} />

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
              <SignUp/>
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
