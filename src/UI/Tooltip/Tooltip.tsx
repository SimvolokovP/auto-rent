import { FC, ReactNode, useState } from "react";

import styles from './Tooltip.module.scss'

interface TooltipProps {
  title?: string;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, title = "" }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className={styles.tooltip}>{title}</div>}
    </div>
  );
};

export default Tooltip;
