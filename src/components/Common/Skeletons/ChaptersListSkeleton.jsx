import React from "react";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import styles from "./styles/contentList.module.scss";
const ChaptersListSkeleton = ({ children }) => {
  return (
    <div className={styles.courseListWrapper}>
      <div className={styles.listHeader}>
        <div className={styles.backBtnWrapper}>
          <div className={styles.backBtnIconDiv}>
            <ChevronRightIcon color="#3D4754" />
          </div>
          <div className={styles.backBtnTextDiv}>
            <div className={styles.textDiv}>
              <p></p>
            </div>
            <div className={styles.lineDiv}></div>
          </div>
        </div>
      </div>
      <div className={styles.mainListWrapperChapter}>
        {children}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default ChaptersListSkeleton;
