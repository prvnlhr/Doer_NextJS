import React from "react";
import styles from "./styles/courseList.module.scss";
import CourseCard from "./CourseCard";

const CoursesList = ({ courses }) => {
  // console.log(courses);
  return (
    <div className={styles.courseListWrapper}>
      {courses.map(
        (course) =>
          course.chaptersCount > 0 && (
            <CourseCard key={course.title} course={course} />
          )
      )}
    </div>
  );
};

export default CoursesList;
