"use client";
import React from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slugUtil";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/context/AppContext";

const SubList = ({ chapter, params }) => {
  const { setShowTopicSidebar, currentOpenChapterIndex } = useAppState();

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
  };

  return (
    <>
      <AnimatePresence>
        {chapter._id === currentOpenChapterIndex &&
          chapter.topics.map((topic, topicIndx) => (
            <motion.div
              onClick={() => handleClick(topic)}
              key={topic._id}
              className={styles.itemWrapper__subTitleWrapper}
              variants={{
                hidden: { opacity: 0, translateY: -20 },
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
      </AnimatePresence>
    </>
  );
};

export default SubList;
