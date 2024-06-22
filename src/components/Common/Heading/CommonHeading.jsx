import React from "react";
import styles from "./styles/commonHeading.module.scss";
const CommonHeading = () => {
  return (
    <div className={styles.headingBox}>
      <div className={styles.headingBox__textWrapper}>
        <p>EXPLORE COURSES</p>
      </div>
      <div className={styles.headingBox__lineWrapper}>
        <span className={styles.headingBox__lineWrapper__lineSpan}></span>
      </div>
    </div>
  );
};

export default CommonHeading;
