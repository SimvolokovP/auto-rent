import { useState, FC, createElement } from "react";

import styles from "./Input.module.scss";

import { IconType } from "react-icons";

interface InputProps {
  name: string;
  icon?: IconType;
  register: any;
  errors?: any;
  placeholder?: string;
  type?: string;
  validation?: object;
  mask?: (value: string) => string;
  accept?: string;
  onChangeCustom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  name,
  icon = null,
  register,
  errors,
  placeholder,
  type = "text",
  validation = {},
  mask,
  accept,
  onChangeCustom,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      const rawValue = e.target.value.replace(/\D/g, "");
      const maskedValue = mask(rawValue);
      e.target.value = maskedValue;
    }

    if (type === "file" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }

    if (onChangeCustom) {
      onChangeCustom(e);
    }
  };

  const displayImage = preview;

  return (
    <div className={styles.inputContainer}>
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
        placeholder={placeholder}
        type={type}
        accept={accept}
        onChange={handleChange}
        className={`${styles.input} ${icon ? styles.withIcon : ""}`}
      />
      {errors?.[name] && <p>{errors[name]?.message}</p>}

      {type === "file" && displayImage && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={displayImage}
            alt="Preview"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
