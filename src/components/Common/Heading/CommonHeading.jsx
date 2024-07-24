import React from "react";
import styles from "./styles/commonHeading.module.scss";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import Link from "next/link";
import SearchIcon from "../Icons/SearchIcon";
const CommonHeading = ({ to, text }) => {
  return (
    <>
      <div className={styles.backBtnWrapperGrid}>
        <Link href={to ? to : "#"} className={styles.iconCell}>
          <div className={styles.chevIconDiv}>
            <ChevronRightIcon />
          </div>
        </Link>
        <div className={styles.textCell}>
          <p>{text}</p>
        </div>
        <div className={styles.lineCell}></div>
        <div className={styles.emptyCell}></div>
      </div>
      <Link href="?search=true" className={styles.searchBtnWrapper}>
        <div className={styles.textWrapper}>
          <p>SEARCH</p>
        </div>
        <div className={styles.lineDiv}></div>
        <div className={styles.iconWrapper}>
          <div className={styles.iconDiv}>
            <SearchIcon />
          </div>
        </div>
      </Link>
    </>
  );
};

export default CommonHeading;
