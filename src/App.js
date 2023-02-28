import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
// import axios from "axios";
// import { format } from "date-fns";
// import * as d3 from "d3";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import RequireUser from "./utils/RequireUser";
import OnlyNotLoggedIn from "./utils/OnlyNotLoggedIn";

function App() {
  return (
    <>
      <Routes>
        <Route element={<OnlyNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
