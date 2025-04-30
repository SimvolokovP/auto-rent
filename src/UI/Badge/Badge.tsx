import React, { FC } from "react";
import styles from "./Badge.module.scss";

type PositionType = "left-top" | "right-top" | "left-bottom" | "right-bottom";

interface BadgeProps {
  children: React.ReactNode;
  count?: number | null;
  color?: string;
  position?: PositionType;
}

const Badge: FC<BadgeProps> = ({
  children,
  count = null,
  color = "red",
  position = "right-top",
}) => {
  const positionClass = (() => {
    switch (position) {
      case "left-top":
        return styles.leftTop;
      case "right-top":
        return styles.rightTop;
      case "left-bottom":
        return styles.leftBottom;
      case "right-bottom":
        return styles.rightBottom;
      default:
        return styles.rightTop;
    }
  })();

  return (
    <div className={styles.wrapper}>
      {children}
      <div
        className={`${styles.badge} ${positionClass}`}
        style={{ backgroundColor: color }}
      >
        {count ? count : ""}
      </div>
    </div>
  );
};

export default Badge;
