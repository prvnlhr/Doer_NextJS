import React from "react";
import styles from "./styles/commonHeading.module.scss";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import Link from "next/link";

const CommonHeading = ({ to, text }) => {
  return (
    <div className={styles.backBtnWrapper}>
      <Link href={to ? to : "#"} className={styles.backBtnIconDiv}>
        <ChevronRightIcon color="#3D4754" />
      </Link>
      <div className={styles.backBtnTextDiv}>
        <div className={styles.textDiv}>
          <p>{text}</p>
        </div>
        <div className={styles.lineDiv}></div>
      </div>
    </div>
  );
};

export default CommonHeading;
