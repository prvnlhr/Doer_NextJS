import React from "react";
import styles from "./styles/courseList.module.scss";
import CourseCard from "./CourseCard";
import CommonHeading from "../Common/Heading/CommonHeading";
import SearchPage from "../Search/SearchPage";
import { fetchCourses } from "@/lib/api/public/coursesApi";

const CoursesList = async ({ searchParams }) => {
  // const courses = await fetchCourses();
  const courses = [];
  return (
    <>
      {searchParams && searchParams?.search && <SearchPage />}
      <div className={styles.courseListWrapper}>
        <div className={styles.listHeader}>
          <CommonHeading to="/" text="EXPLORE COURSES" />
        </div>
        <div className={styles.mainListWrapper}>
          {courses.map(
            (course) =>
              course.chaptersCount > 0 && (
                <CourseCard key={course.title} course={course} />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
