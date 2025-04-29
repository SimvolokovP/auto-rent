import { FC, ReactNode, ButtonHTMLAttributes, useRef } from "react";
import styles from "./Button.module.scss";
import { useRippling } from "../../hooks/useRippling";
import { ClipLoader } from "react-spinners";

type TButtonSize = "s" | "m" | "l";
type TButtonMode = "filled" | "bezeled" | "plain";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: TButtonSize;
  stretched?: boolean;
  mode?: TButtonMode;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  size = "m",
  stretched = false,
  mode = "filled",
  isLoading = false,
  isDisabled = false,
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
      disabled={isLoading || isDisabled}
      onClick={handleClick}
      ref={buttonRef}
      className={`${styles.button} ${styles[`button--${mode}`]} ${
        styles[`button--${size}`]
      }`}
      style={stretched ? { width: "100%" } : {}}
      {...rest}
    >
      {isLoading ? <ClipLoader color="var(--btn-inner)" /> : children}
      {isRippling && (
        <div className="ripple-container">
          <span
            className="ripple"
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
