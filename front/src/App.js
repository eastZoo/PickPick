import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { history } from "./store";

import KakaoOAuth from "./components/auth/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import Profile from "./components/pages/Profile";
import VideoDetail from "./components/pages/VideoDetail";
import './App.css'
import Mypage from "./components/pages/Mypage";

const App = () => {

  return (
    <Router >
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
      </Routes>
      <Routes>
        <Route exact path="/videodetail" element={<VideoDetail />} />
      </Routes>
      <Routes>
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route exact path="/mypage" element={<Mypage />} />
      </Routes>
      <Routes>
        <Route exact path="/oauth/callback/kakao" element={<KakaoOAuth />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
