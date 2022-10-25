import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
