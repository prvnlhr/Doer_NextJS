import React from "react";
import styles from "./styles/search.module.scss";
import Breadcrumbs from "./Breadcrumbs";

const CourseResultElement = ({ item }) => {
  return (
    <div className={styles.searchItemWrapper}>
      <div className={styles.searchedKeyWrapper}>
        <p>{item.title}</p>
      </div>
      <div className={styles.breadCrumbsRow}>
        <Breadcrumbs highlight={true} text={"Course"} />
      </div>
    </div>
  );
};

export default CourseResultElement;
