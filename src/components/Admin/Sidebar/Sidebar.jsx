import React from "react";
import styles from "./styles/sidebar.module.scss";
const Sidebar = ({ show }) => {
  return (
    <div
      className={`${styles.sidebarWrapper} ${
        show ? styles["sidebarWrapper--show"] : styles["sidebarWrapper--hide"]
      } `}
    >
      <div className={styles.sidebarWrapper__sidebarHeader}></div>
    </div>
  );
};

export default Sidebar;
