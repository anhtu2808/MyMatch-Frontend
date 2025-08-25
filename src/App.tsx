import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import Login from "./features/login/pages/Login";
import SwapClass from "./features/swap-class/pages/SwapClass";
import Message from "./features/message/pages/Message";
import TeachersPage from "./features/review/pages/TeachersPage";
import LecturerDetail from "./features/review/pages/LeacturerDetail";
import AddReviewPage from "./features/review/pages/AddReviewPage";
import AddTeacherPage from "./features/review/pages/AddTeacherPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/swap_class" element={<SwapClass />} />
        <Route path="/messages" element={<Message />} />
        {/* Add other routes as needed */}
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/lecturer-detail" element={<LecturerDetail />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/add-review/:teacherId" element={<AddReviewPage />} />
        <Route path="/add-teacher" element={<AddTeacherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
