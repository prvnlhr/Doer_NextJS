import React from "react";
import useSWR from "swr";

import styles from "./styles/mainContent.module.scss";
import { fetchTopicById } from "@/lib/api/public/topicsApi";

const fetcher = (courseId, chapterId, topicId) =>
  fetchTopicById(courseId, chapterId, topicId);

const MainContent = ({ show, setShow, params }) => {
  const { courseId, chapterId, topicId } = params;
  const { data, error, isLoading } = useSWR(
    [courseId, chapterId, topicId],
    fetcher
  );
  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      className={`${styles.mainContentWrapper} ${
        show
          ? styles["mainContentWrapper--show"]
          : styles["mainContentWrapper--hide"]
      }`}
    >
      <div className={styles.mainContentWrapper__breadcrumbsWrapper}></div>
      <div className={styles.mainContentWrapper__contentWrapper}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        )}
      </div>
    </div>
  );
};

export default MainContent;
