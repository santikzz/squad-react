import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";

import GlobalProvider from "./context/GlobalProvider";
// import ProtectedRoute from "./components/ProtectedRoute";

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
import EditGroupPage from "./pages/EditGroupPage";
import Welcome from "./components/Welcome";

function App() {

  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/group/:groupId" element={<GroupPage />} />
          <Route path="/group/chat/:groupId" element={<GroupChatPage />} />
          <Route path="/create" element={<CreateGroupPage />} />
          <Route path="/edit/:groupId" element={<EditGroupPage />} />
          <Route path="/user/:userId" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<FeedbackPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/betainfo" element={<Beta />} />
          {/* </Route> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;