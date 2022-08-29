import { useState } from "react";
import AppRouter from "./routes/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <AppRouter
        isLoggedIn={isLoggedIn}
      />
      <footer>&copy; {new Date().getFullYear()} PickPick🎞</footer>
    </>
  );
}

export default App;
