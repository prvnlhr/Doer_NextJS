"use client";
import React from "react";
import styles from "./styles/subLayout.module.scss";
import { useParams } from "next/navigation";

const SubLayout = ({ children }) => {
  const params = useParams();
  const { courseName, chapterName } = params;
  return (
    <div className={styles.subLayoutWrapper}>
      <div className={styles.subLayoutWrapper__headerWrapper}>
        <p>{courseName}</p>
        <p>{chapterName}</p>
      </div>
      <div className={styles.subLayoutWrapper__contentWrapper}>{children}</div>
    </div>
  );
};

export default SubLayout;
