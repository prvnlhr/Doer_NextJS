import React from "react";
import CourseCardSkeleton from "./CourseCardSkeleton";
import styles from "./styles/contentList.module.scss";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
const CoursesListSkeleton = ({ children }) => {
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
      <div className={styles.mainListWrapperCourses}>
        {children}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default CoursesListSkeleton;
