import { useEffect } from "react";
import { detectTheme } from "./helpers/detectTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AppRouter from "./router/AppRouter";

import "swiper/css";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const [theme] = useLocalStorage("theme", detectTheme());

  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="wrapper">
      <main className="main">
        <AppRouter />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
