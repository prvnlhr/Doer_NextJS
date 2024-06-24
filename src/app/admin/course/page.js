import React from "react";
import styles from "./course.module.scss";
import CourseForm from "@/components/Admin/Course/CourseForm";
const page = () => {
  return (
    <div className={styles.coursePageWrapper}>
      <div className={styles.coursePageWrapper__formWrapper}>
        <CourseForm />
      </div>
    </div>
  );
};

export default page;
