import React from "react";
import styles from "./styles/search.module.scss";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";
const TopicResultElement = ({ item }) => {
  const {
    _id: topicId,
    title: topicName,
    slug: topicSlug,
    duration: topicDuration,
  } = item;

  const {
    _id: chapterId,
    title: chapterName,
    slug: chapterSlug,
    topicsCount: topicsCount,
  } = item.chapter;

  const {
    _id: courseId,
    title: courseName,
    slug: courseSlug,
    chaptersCount: chaptersCount,
  } = item.chapter.course;

  const handleLinkClicked = () => {
    const updatedCourseState = {
      chapterId: chapterId,
      chapterName: chapterName,
      courseId: courseId,
      courseName: courseName,
      chaptersCount: chaptersCount,
      topicsCount: topicsCount,
      topicId: topicId,
      topicName: topicName,
    };
    localStorage.setItem("courseState", JSON.stringify(updatedCourseState));
  };
  return (
    <Link
      onClick={handleLinkClicked}
      href={`/content/courses/${courseSlug}/${courseId}/chapters/${chapterSlug}/${chapterId}/topic/${topicSlug}/${topicId}`}
      className={styles.searchItemLink}
    >
      <div className={styles.searchItemWrapper}>
        <div className={styles.searchedKeyWrapper}>
          <p>{item.title}</p>
        </div>
        <div className={styles.breadCrumbsRow}>
          <Breadcrumbs highlight={true} text={"Topic"} />
          <Breadcrumbs text={item.chapter.course.title} />
          <Breadcrumbs text={item.chapter.title} />
        </div>
      </div>
    </Link>
  );
};

export default TopicResultElement;
