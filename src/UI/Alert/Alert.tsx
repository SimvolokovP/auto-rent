import { useState } from "react";

import styles from "./Alert.module.scss";
import { useAlert } from ".";
import Button from "../Button/Button";
import { IoCloseOutline } from "react-icons/io5";

import {
  PiCheckCircle,
  PiInfo,
  PiProhibit,
  PiWarningCircle,
} from "react-icons/pi";

const getIconByType = (type?: string) => {
  switch (type) {
    case "success":
      return <PiCheckCircle color="green" size={24} />;
    case "info":
      return <PiInfo color="dodgerblue" size={24} />;
    case "warn":
      return <PiWarningCircle color="orange" size={24} />;
    case "error":
      return <PiProhibit color="red" size={24} />;
    default:
      return null;
  }
};

const Alert = () => {
  const { notification, alertShown, close } = useAlert();
  const [textInputValue, setTextInputValue] = useState("");

  return (
    <div
      className={`
        ${styles.alert_container} ${alertShown ? styles.show : styles.hide}`}
    >
      <div className={styles.alert}>
        <div className={styles.alert_content}>
          <div className={styles.alert_body}>
            <div className={styles.icon}>
              {getIconByType(notification?.type)}
            </div>
            <div className={styles.message}>{notification?.message}</div>
          </div>

          {notification?.isCloseBtn && (
            <button
              onClick={close}
              className={`btn-reset ${styles.alert_close}`}
            >
              <IoCloseOutline size={24} color="var(--chapter-color)" />
            </button>
          )}

          <div className={styles.alert_action}>
            {(notification?.actions || []).map((action) => (
              <div key={action.text} className={styles.btn}>
                <Button
                  size="s"
                  mode="plain"
                  {...action.props}
                  onClick={() => {
                    action.callback?.(textInputValue);
                    setTextInputValue("");
                    close();
                  }}
                >
                  {action.text}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
