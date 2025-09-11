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
import ReviewDetail from "./features/review/pages/ReviewDetail";

import Authenticate from "./features/login/pages/Authenticated";
import Login from "./features/login/pages/Login";
import MyInfor from "./features/profile/pages/MyInfor";
import { getToken } from "./features/login/services/localStorageService";
import PrivateRoute from "./PrivateRoute";
import Payment from "./features/payment/pages/Payment";

function App() {
  getToken()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/swap_class" element={<PrivateRoute><SwapClass /></PrivateRoute>} />
        <Route path="/swap_class/create" element={<PrivateRoute><CreateSwapRequest /></PrivateRoute>} />
        <Route path="/swap_class/edit/:id" element={<PrivateRoute><CreateSwapRequest /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Message /></PrivateRoute> } />
        <Route path="/teachers" element={<PrivateRoute><TeachersPage /></PrivateRoute>} />
        <Route path="/lecturer-detail/:id" element={<PrivateRoute><LecturerDetail /></PrivateRoute>} />
        <Route path="/add-review" element={<PrivateRoute><AddReviewPage /></PrivateRoute>} />
        <Route path="/add-review/:teacherId" element={<PrivateRoute><AddReviewPage /></PrivateRoute>} />
        <Route path="/add-teacher" element={<PrivateRoute><AddTeacherPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MyInfor /></PrivateRoute>} />
        <Route path="/message/:studentId/:requestId" element={<PrivateRoute><Message /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><Payment/></PrivateRoute>}/>
        <Route path="/review/:id" element={<PrivateRoute><ReviewDetail /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
