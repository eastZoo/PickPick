import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LOAD_POSTS_REQUEST } from "./redux/reducers/post";
import { Provider, useDispatch, useSelector } from "react-redux";

import KakaoOAuth from "./components/auth/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import Profile from "./components/pages/Profile";
import VideoDetail from "./components/pages/VideoDetail";
import './App.css'
import Mypage from "./components/pages/Mypage";

const App = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch({ type: LOAD_POSTS_REQUEST, });
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage posts={posts} />} />
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
