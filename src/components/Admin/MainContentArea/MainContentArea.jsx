import React from "react";
import styles from "./styles/mainContentArea.module.scss";
import BreadCrumbsBar from "../Breadcrumbs/BreadCrumbsBar";

const MainContentArea = ({ showSidebar, setShowSidebar, children }) => {
  return (
    <div
      className={`${styles.mainContentAreaWrapper} ${
        showSidebar
          ? styles["mainContentAreaWrapper--show"]
          : styles["mainContentAreaWrapper--hide"]
      }`}
    >
      <div
        onClick={() => {
          setShowSidebar((prev) => !prev);
        }}
        className={styles.mainContentAreaWrapper__breadcrumbsWrapper}
      >
        <BreadCrumbsBar />
      </div>
      <div className={styles.mainContentAreaWrapper__contentWrapper}>
        {children}
      </div>
    </div>
  );
};

export default MainContentArea;
