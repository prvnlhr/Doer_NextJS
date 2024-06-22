import React from "react";
import styles from "./styles/sidebar.module.scss";

import Accordion from "./Accordion";

const Sidebar = ({ show, setShow }) => {
  return (
    <div
      className={`${styles.sidebarWrapper} ${
        show ? styles["sidebarWrapper--show"] : styles["sidebarWrapper--hide"]
      } `}
    >
      <div className={styles.sidebarWrapper__sidebarHeader}></div>
      <Accordion />
    </div>
  );
};

export default Sidebar;
