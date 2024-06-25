import React from "react";
import styles from "./chapter.module.scss";
import ChapterForm from "../../../components/Admin/Chapter/ChapterForm";
const page = () => {
  return (
    <div className={styles.coursePageWrapper}>
      <div className={styles.coursePageWrapper__formWrapper}>
        <ChapterForm />
      </div>
    </div>
  );
};

export default page;
