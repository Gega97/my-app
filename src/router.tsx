import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { IGlobarProps } from "./interfaces";

import Login from "./pages/login";
import Feed from "./pages/feed";
import Settings from "./pages/settings";
import Notification from "./pages/notification";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Posts from "./pages/posts";
import Signup from "./pages/signup";
import PostDetail from "./pages/postDetail";

const AppRouter: React.FC<IGlobarProps> = ({ isMobile }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login isMobile={isMobile} />} />
        <Route path="/signup" element={<Signup isMobile={isMobile} />} />
        <Route path="/feed" element={<Feed isMobile={isMobile} />} />
        <Route path="/settings" element={<Settings isMobile={isMobile} />} />
        <Route path="/posts" element={<Posts isMobile={isMobile} />} />
        <Route path="/posts/:id" element={<PostDetail isMobile={isMobile} />} />

        <Route
          path="/notification"
          element={<Notification isMobile={isMobile} />}
        />
        <Route path="/home" element={<Home isMobile={isMobile} />} />
        <Route path="/profile" element={<Profile isMobile={isMobile} />} />
        <Route path="/profile/:id" element={<Profile isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
