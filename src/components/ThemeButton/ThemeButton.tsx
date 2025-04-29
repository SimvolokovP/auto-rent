import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { detectTheme } from "../../helpers/detectTheme";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

type TThemeType = "light" | "dark";

export const ThemeButton = () => {
  const [theme, setTheme] = useLocalStorage("theme", detectTheme());

  const [initValue, setInitValue] = useState<string>("");

  useEffect(() => {
    setInitValue(theme);
  }, [theme]);

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
      initValue={initValue}
      onValue={"light"}
      offValue={"dark"}
      onCallback={() => toggleTheme()}
      offCallback={() => toggleTheme()}
    />
  );
};

export default ThemeButton;
