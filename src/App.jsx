import React from "react";
import { Routes, Route } from "react-router-dom";

import { Dash, Login, Profile, Register, Strategies, Trades } from "./pages";

const App = () => {
  // const accessToken = false;
  //  accessToken ?  : <Login />
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/dashboard" element={<Dash />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/strategies" element={<Strategies />} />
      <Route path="/trades" element={<Trades />} />
    </Routes>
  );
};

export default App;
