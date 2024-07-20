import React from "react";
import styles from "./styles/search.module.scss";
import Breadcrumbs from "./Breadcrumbs";
const TopicResultElement = ({ item }) => {
  return (
    <div className={styles.searchItemWrapper}>
      <div className={styles.searchedKeyWrapper}>
        <p>{item.title}</p>
      </div>
      <div className={styles.breadCrumbsRow}>
        <Breadcrumbs highlight={true} text={"Topic"} />
        <Breadcrumbs text={item.chapter.course.title} />
        <Breadcrumbs text={item.chapter.title} />
      </div>
    </div>
  );
};

export default TopicResultElement;
