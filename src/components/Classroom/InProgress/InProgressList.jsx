import React from "react";
import styles from "./styles/inProgressList.module.scss";
import InProgressCard from "./InProgressCard";

const InProgressList = ({ inprogressCourses }) => {
  return (
    <div className={styles.listWrapper}>
      {inprogressCourses.map((courseProgress) => (
        <InProgressCard
          key={courseProgress._id}
          courseProgress={courseProgress}
        />
      ))}
    </div>
  );
};

export default InProgressList;
