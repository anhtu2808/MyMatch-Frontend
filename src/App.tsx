import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import SwapClass from "./features/swap-class/pages/SwapClass";
import CreateSwapRequest from "./features/swap-class/pages/CreateSwapRequest";
import Message from "./features/message/pages/Message";

import TeachersPage from "./features/review/pages/TeachersPage";
import LecturerDetail from "./features/review/pages/LeacturerDetail";
import AddReviewPage from "./features/review/pages/AddReviewPage";
import AddTeacherPage from "./features/review/pages/AddTeacherPage";

import Authenticate from "./features/login/pages/Authenticated";
import Login from "./features/login/pages/Login";
import MyInfor from "./features/profile/pages/MyInfor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/swap_class" element={<SwapClass />} />
        <Route path="/swap_class/create" element={<CreateSwapRequest />} />
        <Route path="/swap_class/edit/:id" element={<CreateSwapRequest />} />
        <Route path="/messages" element={<Message />} />

        {/* Add other routes as needed */}
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/lecturer-detail/:id" element={<LecturerDetail />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/add-review/:teacherId" element={<AddReviewPage />} />
        <Route path="/add-teacher" element={<AddTeacherPage />} />

        <Route path="/profile" element={<MyInfor />} />

        <Route path="/message/:id" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;
