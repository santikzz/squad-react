import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
// import { HomePage, LoginPage, GroupPage } from "./pages";

import "./App.css";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GroupPage from "@/pages/GroupPage";
import GroupChatPage from "./pages/GroupChatPage";
import CreateGroupPage from "@/pages/CreateGroupPage";
import AboutPage from "./pages/AboutPage";
import FeedbackPage from "./pages/FeedbackPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";

import Beta from "./pages/Beta";
import Welcome from "./components/Welcome";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));
  const currentuser = JSON.parse(localStorage.getItem("userdata") || sessionStorage.getItem("userdata"));

  const [isStandalone, setIsStandalone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log("This is running as standalone.");
      setIsStandalone(true);
    } else {
      console.log("This is not running as standalone.");
      setIsStandalone(false);
    }
  }, []);


  if (!isStandalone && !localStorage.getItem('accept-home-screen')) {
    return (<Welcome/>);
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<RegisterPage isLoggedIn={isLoggedIn} />} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<HomePage currentuser={currentuser} />} />
          <Route path="/group/:groupId" element={<GroupPage currentuser={currentuser} />} />
          <Route path="/group/chat/:groupId" element={<GroupChatPage currentuser={currentuser} />} />
          <Route path="/create" element={<CreateGroupPage />} />
          <Route path="/user/:userId" element={<ProfilePage currentuser={currentuser} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<FeedbackPage />} />
          <Route path="/settings" element={<SettingsPage currentuser={currentuser} />} />
          <Route path="/notifications" element={<NotificationsPage currentuser={currentuser} />} />
          <Route path="/betainfo" element={<Beta/>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
