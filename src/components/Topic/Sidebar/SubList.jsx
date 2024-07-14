"use client";
import React from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slugUtil";
import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";

const SubList = ({ chapter, params }) => {
  const { setShowTopicSidebar } = useAppState();

  const handleClick = (topic) => {
    const storedCourseState = localStorage.getItem("courseState");

    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};

    const updatedState = {
      ...currentState,
      topicId: topic._id,
      topicName: topic.title,
    };

    localStorage.setItem("courseState", JSON.stringify(updatedState));

    let lastOpenedTopics =
      JSON.parse(localStorage.getItem("lastOpenedTopics")) || [];

    const existingIndex = lastOpenedTopics.findIndex(
      (item) => item.topicId === updatedState.topicId
    );

    if (existingIndex !== -1) {
      lastOpenedTopics.splice(existingIndex, 1);
    }

    lastOpenedTopics.unshift(updatedState);

    if (lastOpenedTopics.length > 10) {
      lastOpenedTopics.pop();
    }

    localStorage.setItem("lastOpenedTopics", JSON.stringify(lastOpenedTopics));

    setShowTopicSidebar(false);
  };

  return (
    <>
      {chapter.topics.map((topic, topicIndx) => (
        <motion.div
          onClick={() => handleClick(topic)}
          key={topic._id}
          className={styles.itemWrapper__subTitleWrapper}
        >
          <div className={styles.lineDiv}>
            <div className={styles.dotDiv}></div>
          </div>
          <div className={styles.linkDiv}>
            <Link
              className={styles.linkElement}
              href={`/content/courses/${generateSlug(params.courseName)}/${
                params.courseId
              }/chapters/${generateSlug(params.chapterName)}/${
                params.chapterId
              }/topic/${generateSlug(topic.title)}/${topic._id}`}
            >
              <p
                className={`${styles.topicTitleText} ${
                  topic._id === params.topicId
                    ? styles.topicActive
                    : styles.topicInactive
                } `}
              >
                {topic.title}
              </p>
            </Link>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default SubList;
