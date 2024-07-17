import React from "react";
import styles from "./styles/courseCard.module.scss";
import Shimmer from "./Shimmer";
const CourseCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__logoWrapper}>
        <div>
          <Shimmer />
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}></div>
      </div>
      <div className={styles.card__titleWrapper}>
        <Shimmer />
      </div>

      <div className={styles.card__descWrapper}>
        <Shimmer />
      </div>
      <div className={styles.card__chapterWrapper}>
        <div className={styles.card__chapterWrapper__innerDiv}>
          <Shimmer />
        </div>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__innerDiv}>
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
