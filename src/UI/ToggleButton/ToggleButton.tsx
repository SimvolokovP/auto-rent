import { ChangeEvent, FC, useEffect, useState } from "react";

import styles from "./ToggleButton.module.scss";

interface ToggleButtonProps {
  onCallback: () => void;
  offCallback: () => void;
  isChecked: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  onCallback,
  offCallback,
  isChecked,
}) => {
  const [isOn, setOn] = useState(isChecked);

  const toggle = (e: ChangeEvent<HTMLInputElement>) => {
    setOn(e.target.checked);
  };

  //   useEffect(() => {
  //     if (initValue && onValue) {
  //       console.log(`init: ${initValue}`);
  //       console.log(`on: ${onValue}`);
  //       console.log(`toggle: ${initValue === onValue}`);
  //       setOn(initValue === onValue);
  //     }
  //   }, [initValue]);

  useEffect(() => {
    if (isOn) {
      onCallback();
    } else {
      offCallback();
    }
  }, [isOn]);

  return (
    <div className={`${styles.toggleBtn}`}>
      <label>
        <input type="checkbox" checked={isOn} onChange={toggle} />
        <div className={styles.toggleBtn__sort}></div>
      </label>
    </div>
  );
};

export default ToggleButton;
