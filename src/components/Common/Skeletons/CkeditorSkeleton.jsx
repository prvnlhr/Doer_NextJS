import React from "react";
import styles from "./styles/ckeditorSkeleton.module.scss";
import Shimmer from "./Shimmer";
const CkeditorSkeleton = () => {
  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorHeader}>
        <div className={styles.btnSection1}>
          <Shimmer />
        </div>
        <div className={styles.btnSection2}>
          <Shimmer />
        </div>
        <div className={styles.btnSection3}>
          <Shimmer />
        </div>
        <div className={styles.btnSection4}>
          <Shimmer />
        </div>
      </div>
      <div className={styles.editorBodyWrapper}>
        <div className={styles.fakeH1}>
          <Shimmer />
        </div>
        <div className={styles.fakeP}>
          <Shimmer />
        </div>
        <div className={styles.fakeP}>
          <Shimmer />
        </div>{" "}
        <div className={styles.fakeP}>
          <Shimmer />
        </div>{" "}
        <div className={styles.fakeP}>
          <Shimmer />
        </div>{" "}
        <div className={styles.fakeP}>
          <Shimmer />
        </div>
        <div className={styles.fakeH1}>
          <Shimmer />
        </div>
        <div className={styles.fakeP}>
          <Shimmer />
        </div>
        <div className={styles.fakeP}>
          <Shimmer />
        </div>{" "}
        <div className={styles.fakeP}>
          <Shimmer />
        </div>{" "}
        <div className={styles.fakeP}>
          <Shimmer />
        </div>{" "}
        <div className={styles.fakeP}>
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default CkeditorSkeleton;
