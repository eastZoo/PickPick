import React from "react";
import {  Route  } from "react-router-dom";

import KakaoOAuth from "./components/auth/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import VideoDetail from "./components/pages/VideoDetail";
import "./App.css";
import Floating from "./components/layout/Floating";
import Mypage from "./components/pages/Mypage";



const App = () => {
  return (
    <>
      <Header />
      <Floating/>
      <Route path="/" component={MainPage} exact={true} />
      <Route path="/video/:id" component={VideoDetail} exact={true} />
      <Route path="/mypage" component={Mypage} exact={true} />
      <Route path="/oauth/callback/kakao" component={KakaoOAuth} exact={true} />
      <Footer />
    </>
  );
};

export default App;
