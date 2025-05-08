import { FC, useState, useRef, useEffect, createElement } from "react";

import styles from "./AutoComplete.module.scss";
import { IconType } from "react-icons";

interface AutoCompleteProps {
  name: string;
  register: any;
  errors?: any;
  label?: string;
  placeholder?: string;
  data: string[];
  onChangeCustom?: (value: string) => void;
  icon?: IconType | null;
  validation?: object;
  targetValue?: any;
}

const AutoComplete: FC<AutoCompleteProps> = ({
  name,
  register,
  errors,
  placeholder,
  onChangeCustom,
  data = [],
  icon = null,
  validation = {},
  targetValue = null,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHideSuggs, setIsHideSuggs] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  // const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetValue) {
      setSelectedValue(targetValue);
    }
  }, [targetValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSelectedValue(input);
    if (onChangeCustom) onChangeCustom(input);
    if (input) {
      const filtered = data.filter((i) =>
        i.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);

      if (filtered.length === 0) {
        setIsHideSuggs(true);
      } else {
        setIsHideSuggs(false);
      }
    } else {
      setSuggestions([]);
      setIsHideSuggs(true);
    }
  };

  const handleSuggestionClick = (item: string) => {
    setSelectedValue(item);
    if (onChangeCustom) onChangeCustom(item);
    setIsHideSuggs(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsHideSuggs(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.suggestionAuto} ref={containerRef} tabIndex={0}>
      <div className={styles.suggestionAutoControl}>
        {icon && (
          <label htmlFor={name}>
            {createElement(icon, {
              className: styles.icon,
              size: 24,
              color: "var(--input-placeholder)",
            })}
          </label>
        )}
        <input
          id={name}
          {...register(name, validation)}
          className={`${styles.input} ${icon ? styles.withIcon : ""}`}
          placeholder={placeholder}
          value={selectedValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (selectedValue) {
              setSuggestions(
                data.filter((i) =>
                  i.toLowerCase().startsWith(selectedValue.toLowerCase())
                )
              );
              setIsHideSuggs(false);
            }
          }}
        />

        {errors?.[name] && <p>{errors[name]?.message}</p>}
      </div>

      <ul
        className={`${styles.suggestions} ${!isHideSuggs ? styles.show : ""}`}
      >
        {suggestions.map((item, idx) => (
          <li
            className={styles.suggestionsItem}
            key={item + idx}
            onClick={() => handleSuggestionClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
