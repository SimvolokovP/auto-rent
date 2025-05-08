import { FC, ReactNode } from "react";

import styles from "./Breadcrumb.module.scss";

interface IBreadcrumbItem {
  title: string | ReactNode;
}

interface BreadcrumbProps {
  items?: IBreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items = [] }) => {
  return (
    <ul className={styles.list}>
      {items.map((item, idx) => (
        <li key={idx}>{item.title}</li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
