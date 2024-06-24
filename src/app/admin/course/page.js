import React from "react";
import styles from "./course.module.scss";
import CKeditor from "@/components/Admin/CKeditor/Ckeditor";
import CourseForm from "@/components/Admin/Course/CourseForm";
import styles1 from "../../../components/Admin/Course/styles/courseForm.module.scss";
const page = () => {
  return (
    <div className={styles.courseWrapper}>
      <div className={styles.courseWrapper__formWrapper}>
        <CourseForm />
      </div>
      <div className={styles.courseWrapper__previewWrapper}></div>
    </div>
  );
};

export default page;
