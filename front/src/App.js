import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Footer/>
    </Router>
  );
}

export default App;
