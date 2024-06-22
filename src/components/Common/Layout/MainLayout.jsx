import React from "react";
import styles from "./styles/mainLayout.module.scss";
import MainHeader from "../mainHeader/MainHeader";
const MainLayout = () => {
  return (
    <div className={styles.mainLayoutWrapper}>
      <MainHeader />
    </div>
  );
};

export default MainLayout;
