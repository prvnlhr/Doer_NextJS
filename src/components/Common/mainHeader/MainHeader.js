import React from "react";
import styles from "./styles/mainHeader.module.scss";
import AppLogo from "../logo/AppLogo";

const MainHeader = () => {
  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.headerWrapper__appLogoWrapper}>
        <AppLogo />
      </div>
    </nav>
  );
};

export default MainHeader;
