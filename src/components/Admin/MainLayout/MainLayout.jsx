"use client";
import React, { useState } from "react";
import styles from "./styles/mainLayout.module.scss";

import Sidebar from "../Sidebar/Sidebar";
import MainContentArea from "../MainContentArea/MainContentArea";

const MainLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.mainLayoutWrapper}>
      <div className={styles.mainLayoutWrapper__innerWrapper}>
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <MainContentArea
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          children={children}
        />
      </div>
    </div>
  );
};

export default MainLayout;
