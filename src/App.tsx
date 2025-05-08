import { useEffect } from "react";
import { detectTheme } from "./helpers/detectTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AppRouter from "./router/AppRouter";

// @ts-ignore
import "swiper/css";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import useUserStore from "./store/useUserStore";

function App() {
  const [theme] = useLocalStorage("theme", detectTheme());

  const { checkAuth } = useUserStore();

  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);

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
