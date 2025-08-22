import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import Login from "./features/login/pages/Login";
import SwapClass from "./features/swap-class/pages/SwapClass";
import Message from "./features/message/pages/Message";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/swap_class" element={<SwapClass />} />
        <Route path="/messages" element={<Message />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
