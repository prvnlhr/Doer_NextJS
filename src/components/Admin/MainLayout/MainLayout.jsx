import React from "react";
import styles from "./styles/mainLayout.module.scss";

import Sidebar from "../Sidebar/Sidebar";
import MainContentArea from "../MainContentArea/MainContentArea";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.mainLayoutWrapper}>
      <Sidebar />
      <MainContentArea children={children} />
    </div>
  );
};

export default MainLayout;
