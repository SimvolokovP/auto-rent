import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { detectTheme } from "../../helpers/detectTheme";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

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
    setTheme((currentValue: TThemeType) => {
      return currentValue === "light" ? "dark" : "light";
    });
  }

  return (
    <ToggleButton
      isChecked={theme === "light"}
      onCallback={() => toggleTheme()}
      offCallback={() => toggleTheme()}
    />
  );
};

export default ThemeButton;
