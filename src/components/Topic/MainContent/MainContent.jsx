import React from "react";
import styles from "./styles/mainContent.module.scss";

const MainContent = ({ show, setShow }) => {
  return (
    <div
      className={`${styles.mainContentWrapper} ${
        show
          ? styles["mainContentWrapper--show"]
          : styles["mainContentWrapper--hide"]
      }`}
    >
      <div className={styles.mainContentWrapper__breadcrumbsWrapper}></div>
      <div className={styles.mainContentWrapper__contentWrapper}></div>
    </div>
  );
};

export default MainContent;
