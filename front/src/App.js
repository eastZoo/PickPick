import React from "react";
import { Route } from "react-router-dom";

import KakaoOAuth from "./auth/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./pages/MainPage";
import VideoDetail from "./pages/VideoDetail";
import "./App.css";
import Floating from "./components/layout/Floating";
import Mypage from "./pages/Mypage";



const App = () => {
  return (
    <>
      <Header />
      <Floating />
      <Route path="/" component={MainPage} exact={true} />
      <Route path="/video/:id" component={VideoDetail} exact={true} />
      <Route path="/mypage" component={Mypage} exact={true} />
      <Route path="/oauth/callback/kakao" component={KakaoOAuth} exact={true} />
      <Footer />
    </>
  );
};

export default App;
