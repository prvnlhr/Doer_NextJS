import React from "react";
import styles from "../../Course/styles/courseCard.module.scss";
const CourseCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__logoWrapper}>
        <div></div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}></div>
      </div>
      <div className={styles.card__titleWrapper}></div>
      <div className={styles.card__descWrapper}></div>
      <div className={styles.card__chapterWrapper}>
        <div className={styles.card__chapterWrapper__innerDiv}></div>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__innerDiv}></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
