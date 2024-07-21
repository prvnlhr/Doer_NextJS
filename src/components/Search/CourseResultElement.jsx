import React from "react";
import styles from "./styles/search.module.scss";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";

const CourseResultElement = ({ item }) => {
  const { _id: courseId, title: courseName } = item;
  const handleLinkClicked = () => {
    const updatedCourseState = {
      courseId: courseId,
      courseName: courseName,
    };
    localStorage.setItem("courseState", JSON.stringify(updatedCourseState));
  };
  return (
    <Link
      onClick={handleLinkClicked}
      href={`/content/courses?item=${courseId}`}
      className={styles.searchItemLink}
    >
      <div className={styles.searchItemWrapper}>
        <div className={styles.searchedKeyWrapper}>
          <p>{item.title}</p>
        </div>
        <div className={styles.breadCrumbsRow}>
          <Breadcrumbs highlight={true} text={"Course"} />
        </div>
      </div>
    </Link>
  );
};

export default CourseResultElement;
