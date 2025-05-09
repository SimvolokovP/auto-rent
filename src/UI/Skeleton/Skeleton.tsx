import { CSSProperties, FC, ReactNode } from "react";

import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  isActive?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}

const Skeleton: FC<SkeletonProps> = ({ isActive = false, children, style }) => {
  return (
    <div className={styles.skeleton} style={{ ...style }}>
      {children}
      {isActive && <div className={styles.skeleton_block} />}
    </div>
  );
};

export default Skeleton;
