import React from "react";
import styles from "./styles/courseList.module.scss";
import CourseCard from "./CourseCard";
import CommonHeading from "../Common/Heading/CommonHeading";
import SearchPage from "../Search/SearchPage";
import { fetchCourses } from "@/lib/api/public/coursesApi";

const CoursesList = async ({ courses, searchParams }) => {
  const { item: searchedItemId } = searchParams || {};
  const sortedCourses = searchedItemId
    ? [...courses].sort((a, b) => {
        if (a._id === searchedItemId) return -1;
        if (b._id === searchedItemId) return 1;
        return 0;
      })
    : courses;
  return (
    <>
      {searchParams && searchParams?.search && <SearchPage />}
      <div className={styles.courseListWrapper}>
        <div className={styles.listHeader}>
          <CommonHeading
            searchParams={searchParams}
            to="/"
            text="EXPLORE COURSES"
          />
        </div>
        <div className={styles.mainListWrapper}>
          {sortedCourses.map(
            (course) =>
              course.chaptersCount > 0 && (
                <CourseCard
                  searchParams={searchParams}
                  key={course.title}
                  course={course}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
