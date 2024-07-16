import React from "react";
import styles from "./styles/chapterCard.module.scss";
const ChapterCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__chapterNumWrapper}></div>
      <div className={styles.card__bookmarkIconWrapper}></div>
      <div className={styles.card__titleWrapper}></div>
      <div className={styles.card__topicsListWrapper}>
        <div className={styles.listInnerWrapper}></div>
      </div>
      <div className={styles.card__topicsCountWrapper}></div>
      <div className={styles.card__durationWrapper}></div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}></div>
      </div>
    </div>
  );
};

export default ChapterCardSkeleton;
