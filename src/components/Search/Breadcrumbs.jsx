import React from "react";
import styles from "./styles/search.module.scss";
import ChevronRightIcon from "../Common/Icons/ChevronRightIcon";
const Breadcrumbs = ({ text, highlight }) => {
  return (
    <div className={styles.breadcrumbsWrapper}>
      <div
        className={`${styles.textWrapper} ${
          highlight && styles["textWrapper--active"]
        }`}
      >
        <p>{text}</p>
      </div>
      <div className={styles.chevIconWrapper}>
        <div className={styles.chevIconDiv}>
          <ChevronRightIcon color="white" />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
