import { FC, useState, useRef, useEffect, createElement } from "react";

import styles from "./Select.module.scss";
import { PiArrowUpBold } from "react-icons/pi";

interface OptionProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  register: any;
  errors?: any;
  label?: string;
  placeholder?: string;
  options: Array<OptionProps>;
  onChangeCustom?: (value: any) => void;
  OptionComponent?: FC<OptionProps> | null;
  validation?: object;
  setValue: (name: any, value: any) => void;
  targetValue?: any;
}

const Select: FC<SelectProps> = ({
  name,
  register,
  errors,
  placeholder,
  onChangeCustom,
  options = [],
  OptionComponent = null,
  validation = {},
  setValue,
  targetValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetValue) {
      setSelectedLabel(targetValue);
    }
  }, [targetValue]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: OptionProps) => {
    setSelectedLabel(option.label);
    if (onChangeCustom) onChangeCustom(option.value);
    setValue(name, option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} ref={containerRef} tabIndex={0}>
      <div className={styles.control} onClick={handleToggle}>
        {selectedLabel || placeholder || "Select..."}
        <div className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <PiArrowUpBold size={20} />
        </div>
      </div>

      {errors?.[name] && <p>{errors[name]?.message}</p>}

      {isOpen && (
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, idx) => (
            <li
              key={option.value.toString() + idx}
              className={styles.option}
              onClick={() => handleOptionSelect(option)}
            >
              {OptionComponent
                ? createElement(OptionComponent, {
                    label: option.label,
                    value: option.value,
                  })
                : option.label}
            </li>
          ))}
        </ul>
      )}

      <input type="hidden" id={name} {...register(name, validation)} />
    </div>
  );
};

export default Select;
