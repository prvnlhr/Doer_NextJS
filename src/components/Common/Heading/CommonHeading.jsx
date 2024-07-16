import React from "react";
import styles from "./styles/commonHeading.module.scss";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
const CommonHeading = ({ text }) => {
  return (
    <div className={styles.backBtnWrapper}>
      <div className={styles.backBtnIconDiv}>
        <ChevronRightIcon color="#3D4754" />
      </div>
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
