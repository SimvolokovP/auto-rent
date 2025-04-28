import { FC, ReactNode, ButtonHTMLAttributes, useRef, useState } from "react";
import styles from "./Button.module.scss";
import { useRippling } from "../../hooks/useRippling";

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
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { onClick, ...props } = rest;

  const { x, y, handleRippleOnClick, isRippling } = useRippling();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRippleOnClick(e);
    onClick && onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      ref={buttonRef}
      className={`${styles.button} ${styles[`button--${mode}`]} ${
        styles[`button--${size}`]
      }`}
      style={stretched ? { width: "100%" } : {}}
      {...rest}
    >
      {children}
      {isRippling && (
        <div className={styles.btnRippleContainer}>
          <span
            className={styles.btnRipple}
            style={{
              left: x,
              top: y,
            }}
          />
        </div>
      )}
    </button>
  );
};

export default Button;
