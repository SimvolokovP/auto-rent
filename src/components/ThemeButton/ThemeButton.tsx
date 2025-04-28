import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";
import { detectTheme } from "../../helpers/detectTheme";

type TThemeType = "light" | "dark";

export const ThemeButton = () => {
  const [theme, setTheme] = useLocalStorage("theme", detectTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    console.log(theme);
    setTheme((currentValue: TThemeType) => {
      return currentValue === "light" ? "dark" : "light";
    });
  }

  return (
    <button className="cursor-pointer" onClick={toggleTheme}>
      {theme === "dark" ? (
        <TbMoonFilled size={22} />
      ) : (
        <TbSunFilled size={22} />
      )}
    </button>
  );
};

export default ThemeButton;
