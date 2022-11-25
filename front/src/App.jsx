import { ProfileFilled } from "@ant-design/icons";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import KakaoOAuth from "./components/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import Profile from "./components/pages/Profile";
import VideoDetail from "./components/pages/VideoDetail";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
      </Routes>
      <Routes>
        <Route exact path="/videodetail" element={<VideoDetail/>}/>
      </Routes>
      <Routes>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
      <Routes>
        <Route exact path="/oauth/callback/kakao" element={<KakaoOAuth />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
