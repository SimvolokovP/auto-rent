import { FC, ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type TButtonSize = "s" | "m" | "l";
type TButtonMode = "filled" | "bezeled" | "plain";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: TButtonSize;
  stretched?: boolean;
  mode?: TButtonMode;
}

const Button: FC<ButtonProps> = ({
  children,
  size = "m",
  stretched = false,
  mode = "filled",
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${mode}`]} ${
        styles[`button--${size}`]
      }`}
      style={stretched ? { width: "100%" } : { width: "" }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
