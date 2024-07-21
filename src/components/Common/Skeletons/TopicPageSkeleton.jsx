import React from "react";
import styles from "./styles/topicPageSkeleton.module.scss";
import Shimmer from "./Shimmer";
const TopicPageSkeleton = () => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topicHeaderWrapper}>
        <div className={styles.durationWrapper}>
          <div className={styles.durationIconDiv}>
            <Shimmer />
          </div>
          <div className={styles.durationTextDiv}>
            <Shimmer />
          </div>
        </div>
      </div>
      <div className={styles.topicContentWrapper}>
        <div className={styles.titleDiv}>
          <Shimmer />
        </div>
        {Array.from({ length: 10 }).map((ele, indx) => (
          <div className={styles.lineDiv} key={indx}>
            <Shimmer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicPageSkeleton;
