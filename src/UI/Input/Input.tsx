import { useState, FC } from "react";

import styles from "./Input.module.scss";
import {
  PiMailboxFill,
  PiPassword,
  PiUserFill,
  PiImagesFill,
  PiUserPlusFill,
  PiPhoneFill,
  PiImageFill,
} from "react-icons/pi";

interface InputProps {
  name: string;
  label?: string;
  register: any;
  errors?: any;
  placeholder?: string;
  type?: string;
  validation?: object;
  mask?: (value: string) => string;
  accept?: string;
  onChangeCustom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  text: <PiUserFill size={24} />,
  email: <PiMailboxFill size={24} />,
  password: <PiPassword size={24} />,
  tel: <PiPhoneFill size={24} />,
  file: <PiImageFill size={24} />,
};

const Input: FC<InputProps> = ({
  name,
  label,
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

  const icon = iconMap[type] || null;

  const displayImage = preview;

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label
          htmlFor={name}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {icon}
        </label>
      )}
      <input
        id={name}
        {...register(name, validation)}
        placeholder={placeholder}
        type={type}
        accept={accept}
        onChange={handleChange}
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
