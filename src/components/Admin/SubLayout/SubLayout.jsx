import React from "react";
import styles from "./styles/subLayout.module.scss";
import LinksBar from "../Link/LinksBar";

const SubLayout = ({ children }) => {
  return (
    <div className={styles.subLayoutWrapper}>
      <div className={styles.subLayoutWrapper__headerWrapper}>
        <div className={styles.tabsWrapper}>
          <LinksBar />
        </div>
        <div className={styles.buttonWrapper}></div>
      </div>
      <div className={styles.subLayoutWrapper__contentWrapper}>{children}</div>
    </div>
  );
};

export default SubLayout;
