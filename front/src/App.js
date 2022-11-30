import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";

import './App.css'
import KakaoOAuth from "./components/KakaoOAuth";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import Profile from "./components/pages/Profile";
import VideoDetail from "./components/pages/VideoDetail";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>
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
            <Route
              exact
              path="/oauth/callback/kakao"
              element={<KakaoOAuth />}
            />
          </Routes>
          <Footer />
        </Router>
      </ConnectedRouter>
    </Provider>
  );
}
export default App;
