import React from "react";
import styles from "./styles/chapterCard.module.scss";
import Shimmer from "./Shimmer";
const ChapterCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__chapterNumWrapper}>
        <Shimmer />
      </div>
      <div className={styles.card__bookmarkIconWrapper}></div>
      <div className={styles.card__titleWrapper}>
        <Shimmer />
      </div>
      <div className={styles.card__topicsListWrapper}>
        <div className={styles.listInnerWrapper}>
          <div>
            <Shimmer />
          </div>
          <div>
            <Shimmer />
          </div>
          <div>
            <Shimmer />
          </div>
        </div>
      </div>
      <div className={styles.card__topicsCountWrapper}>
        <Shimmer />
      </div>
      <div className={styles.card__durationWrapper}>
        <Shimmer />
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}></div>
      </div>
    </div>
  );
};

export default ChapterCardSkeleton;
