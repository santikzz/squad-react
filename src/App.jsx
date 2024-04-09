import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
// import { HomePage, LoginPage, GroupPage } from "./pages";

import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
// import Register from "@/pages/Register";
import GroupPage from "@/pages/GroupPage";
// import CreateGroup from "@/pages/CreateGroup";

function App() {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/group" element={<GroupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
