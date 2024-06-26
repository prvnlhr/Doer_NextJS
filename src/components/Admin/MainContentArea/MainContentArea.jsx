"use client";
import React from "react";
import styles from "./styles/mainContentArea.module.scss";
import { usePathname } from "next/navigation";

const MainContentArea = ({ showSidebar, setShowSidebar, children }) => {
  const pathname = usePathname();

  console.log(pathname);
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
          console.log("ss");
        }}
        className={styles.mainContentAreaWrapper__breadcrumbsWrapper}
      >
        <p>{pathname}</p>
      </div>
      <div className={styles.mainContentAreaWrapper__contentWrapper}>
        {/* This children will be SubLayout */}
        {children}
      </div>
    </div>
  );
};

export default MainContentArea;
