import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";


import Book from "./pages/Book";
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
import Home from "./pages/Home";
import LoadingMask from "./components/LoadingMask";

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
        <Route path="/" element={<Home />} />
        <Route path="/book" element={
          <Protected>
            <Book />
          </Protected>
        } />
        <Route path="/repairlist" element={<RepairList />} />
        <Route path="/repair/:id" element={<Repair />} />
        <Route path="/shopsearch" element={<ShopSearch />} />
        <Route path="/shop/:id" element={<Shop />} />

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
