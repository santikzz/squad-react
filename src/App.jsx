import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
// import { HomePage, LoginPage, GroupPage } from "./pages";

import "./App.css";

import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
// import Register from "@/pages/Register";
import GroupPage from "@/pages/GroupPage";
import CreateGroupPage from "@/pages/CreateGroupPage";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<LoginPage/>} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/group/:groupId" element={<GroupPage />} />
          <Route path="/create" element={<CreateGroupPage />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
