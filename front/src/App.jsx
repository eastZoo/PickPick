import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/test/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainPage from "./pages/MainPage";
import VideoDetail from "./pages/VideoDetail";
import './App.css'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
      </Routes>
      <Routes>
        <Route exact path="/test" element={<Home />}/>
      </Routes>
      <Routes>
        <Route exact path="/videodetail" element={<VideoDetail />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
