import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import PrivateRoute from "./PrivateRoute";
import Payment from "./features/payment/pages/Payment";
import Product from "./features/product/pages/Product";
import MaterialPage from "./features/material/pages/MaterialPage";
import MaterialDetailPage from "./features/material/pages/MaterialDetailPage";
import CreateMaterial from "./features/material/pages/CreateMaterial";
import UpdateMaterial from "./features/material/pages/UpdateMaterial";
import Finding from "./features/matching-member/pages/Finding";
import FindingForum from "./features/matching-member/pages/FindingForum";
import { UnreadMessagesProvider } from "./features/message/components/UnreadMessagesContext";
import Coin from "./features/coin/pages/Coin";
import TermsOfService from "./features/legal/TermsOfService";
import PrivacyPolicy from "./features/legal/PrivacyPolicy";
import AboutUsPage from "./features/about/AboutUsPage";

function AppRoutes() {
  const token = localStorage.getItem("accessToken");
  const location = useLocation()
  const hiddenCoinRoutes = ["/login", "/authenticate"]
  const showCoin = token && !hiddenCoinRoutes.includes(location.pathname)
  return (
      <UnreadMessagesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/swap_class" element={<PrivateRoute><SwapClass /></PrivateRoute>} />
        <Route path="/swap_class/create" element={<PrivateRoute><CreateSwapRequest /></PrivateRoute>} />
        <Route path="/swap_class/edit/:id" element={<PrivateRoute><CreateSwapRequest /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Message /></PrivateRoute> } />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/lecturer-detail/:id" element={<PrivateRoute><LecturerDetail /></PrivateRoute>} />
        <Route path="/add-review" element={<PrivateRoute><AddReviewPage /></PrivateRoute>} />
        <Route path="/add-review/:teacherId" element={<PrivateRoute><AddReviewPage /></PrivateRoute>} />
        <Route path="/add-teacher" element={<PrivateRoute><AddTeacherPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MyInfor /></PrivateRoute>} />
        <Route path="/message/:studentId" element={<PrivateRoute><Message /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><Payment/></PrivateRoute>}/>
        <Route path="/review/:id" element={<PrivateRoute><ReviewDetail /></PrivateRoute>} />
        <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>} />
        <Route path="/finding" element={<PrivateRoute><Finding /></PrivateRoute>} />
        <Route path="/finding_forum" element={<PrivateRoute><FindingForum /></PrivateRoute>} />
        <Route path="/material" element={<PrivateRoute><MaterialPage /></PrivateRoute>} />
        <Route path="/material/:id" element={<PrivateRoute><MaterialDetailPage /></PrivateRoute>} />
        <Route path="/material/create" element={<PrivateRoute><CreateMaterial /></PrivateRoute>} />
        <Route path="/material/update/:id" element={<PrivateRoute><UpdateMaterial /></PrivateRoute>} />
      </Routes>
      {showCoin &&  <Coin /> }
      </UnreadMessagesProvider>
  );
}

function App() {
  return (
  <Router>
    <AppRoutes />
    <Routes>
      <Route path="/terms_of_service" element={<UnreadMessagesProvider><TermsOfService /></UnreadMessagesProvider>} />
      <Route path="/privacy_policy" element={<UnreadMessagesProvider><PrivacyPolicy /></UnreadMessagesProvider>} />
      <Route path="/about" element={<UnreadMessagesProvider><AboutUsPage /></UnreadMessagesProvider>} />
    </Routes>
  </Router>
  )
}
export default App;
