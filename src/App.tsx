import { useEffect } from "react";
import { detectTheme } from "./helpers/detectTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AppRouter from "./router/AppRouter";

import "swiper/css";

function App() {
  const [theme] = useLocalStorage("theme", detectTheme());

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
      {/* <Footer /> */}
    </div>
  );
}

export default App;
