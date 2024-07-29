"use client";
import React from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slugUtil";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import CheckedIcon from "@/components/Common/Icons/CheckedIcon";

const SubList = ({ chapter, params }) => {
  const {
    setShowTopicSidebar,
    currentOpenChapterIndex,
    completedTopics,
    setCourseState,
  } = useAppState();

  const handleClick = (topic) => {
    const storedCourseState = localStorage.getItem("courseState");
    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};
    const updatedState = {
      ...currentState,
      topicId: topic._id,
      topicName: topic.title,
    };

    localStorage.setItem("courseState", JSON.stringify(updatedState));
    setShowTopicSidebar(false);
    setCourseState(updatedState);
  };

  const isTopicCompleted = (topicId) => {
    return completedTopics && completedTopics.includes(topicId);
  };
  return (
    <AnimatePresence>
      {chapter._id === currentOpenChapterIndex &&
        chapter.topics.map((topic, topicIndx) => (
          <motion.div
            onClick={() => handleClick(topic)}
            key={topic._id}
            className={styles.itemWrapper__subTitleWrapper}
            variants={{
              hidden: { opacity: 0, translateY: -30 },
              visible: { opacity: 1, translateY: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.3,
              delay: topicIndx * 0.1,
              ease: [0.12, 0, 0.39, 0],
            }}
          >
            <div className={styles.lineCell}>
              <div className={styles.lineDiv}></div>
            </div>
            <div className={styles.iconCell}>
              <div className={styles.iconDiv}>
                {isTopicCompleted(topic._id) ? (
                  <CheckedIcon />
                ) : (
                  <div
                    className={`${styles.dotIcon} ${
                      topic._id === params.topicId && styles.activeDot
                    }`}
                  ></div>
                )}
              </div>
            </div>
            <div className={styles.subTitleCell}>
              <Link
                className={styles.link}
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
    </AnimatePresence>
  );
};

export default SubList;
