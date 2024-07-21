import React from "react";
import styles from "./styles/search.module.scss";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";

const ChapterResultElement = ({ item }) => {
  // console.log(item);
  const {
    _id: chapterId,
    slug: chapterSlug,
    title: chapterName,
    topicsCount,
  } = item;

  const {
    _id: courseId,
    title: courseName,
    slug: courseSlug,
    chaptersCount,
  } = item.course;

  const handleLinkClicked = () => {
    const storedCourseState =
      JSON.parse(localStorage.getItem("courseState")) || {};

    const updatedCourseState = {
      ...storedCourseState,
      courseId: courseId,
      courseName: courseName,
      chaptersCount: chaptersCount,
    };
    localStorage.setItem("courseState", JSON.stringify(updatedCourseState));
  };
  return (
    <Link
      onClick={handleLinkClicked}
      href={`/content/courses/${courseName}/${courseId}/chapters?item=${chapterId}`}
      className={styles.searchItemLink}
    >
      <div className={styles.searchItemWrapper}>
        <div className={styles.searchedKeyWrapper}>
          <p>{item.title}</p>
        </div>
        <div className={styles.breadCrumbsRow}>
          <Breadcrumbs highlight={true} text={"Chapter"} />
          <Breadcrumbs text={item.course.title} />
        </div>
      </div>
    </Link>
  );
};

export default ChapterResultElement;
