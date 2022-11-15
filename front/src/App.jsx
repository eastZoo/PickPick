import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainPage from "./pages/MainPage";
import VideoDetail from "./pages/VideoDetail";
import './App.css'
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import KakaoOAuth from "./components/KakaoOAuth";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
      </Routes>
      <Routes>
        <Route exact path="/videodetail" element={<VideoDetail />}/>
      </Routes>
      <Routes>
        <Route exact path="/profile" element={<Profile />}/>
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
      </Routes>
      <Routes>
        <Route exact path="/oauth/callback/kakao" element={<KakaoOAuth />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
