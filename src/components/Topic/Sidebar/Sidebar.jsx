import React from "react";
import styles from "./styles/sidebar.module.scss";

import Accordion from "./Accordion";

const Sidebar = ({ show, setShow, accordionData, params }) => {
  return (
    <div
      className={`${styles.sidebarWrapper} ${
        show ? styles["sidebarWrapper--show"] : styles["sidebarWrapper--hide"]
      } `}
    >
      <div
        className={styles.sidebarWrapper__sidebarHeader}
        onClick={() => setShow((prev) => !prev)}
      ></div>
      <Accordion params={params} accordionData={accordionData} />
    </div>
  );
};

export default Sidebar;
