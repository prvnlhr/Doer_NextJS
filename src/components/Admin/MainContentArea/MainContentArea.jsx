"use client";
import React from "react";
import styles from "./styles/mainContentArea.module.scss";
import { usePathname } from "next/navigation";

const MainContentArea = ({ show, children }) => {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div
      className={`${styles.mainContentAreaWrapper} ${
        show
          ? styles["mainContentAreaWrapper--show"]
          : styles["mainContentAreaWrapper--hide"]
      }`}
    >
      <div className={styles.mainContentAreaWrapper__breadcrumbsWrapper}>
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
