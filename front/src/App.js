import React from "react";
import {  Route  } from "react-router-dom";

import KakaoOAuth from "./components/auth/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import Profile from "./components/pages/Profile";
import VideoDetail from "./components/pages/VideoDetail";
import "./App.css";


const App = () => {
  return (
    <>
      <Header />
      <Route path="/" component={MainPage} exact={true} />
      <Route path="/video/:id" component={VideoDetail} exact={true} />
      <Route path="/mypage" component={Profile} exact={true} />
      <Route path="/oauth/callback/kakao" component={KakaoOAuth} exact={true} />
      <Footer />
    </>
  );
};

export default App;
