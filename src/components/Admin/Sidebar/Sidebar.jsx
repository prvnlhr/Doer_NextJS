import React from "react";
import styles from "./styles/sidebar.module.scss";
const Sidebar = ({ setShowSidebar, showSidebar }) => {
  return (
    <div
      onClick={() => setShowSidebar((prev) => !prev)}
      className={`${styles.sidebarWrapper} ${
        showSidebar
          ? styles["sidebarWrapper--show"]
          : styles["sidebarWrapper--hide"]
      } `}
    >
      <div className={styles.sidebarWrapper__sidebarHeader}></div>
    </div>
  );
};

export default Sidebar;
