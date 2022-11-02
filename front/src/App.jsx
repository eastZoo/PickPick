import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/test/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainPage from "./pages/MainPage";

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
      <Footer/>
    </Router>
  );
}

export default App;
