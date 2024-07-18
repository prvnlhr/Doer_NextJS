"use client";
import React, { useEffect } from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import SubList from "./SubList";
import { motion } from "framer-motion";
const AccordionItem = ({ topicIds, chapter }) => {
  const params = useParams();
  const { courseName, courseId, chapterId } = params;

  const {
    currentOpenChapterIndex,
    setCurrentOpenChapterIndex,
    currentOpenChapterHeight,
    setCurrentOpenChapterHeight,
  } = useAppState();

  const handleClick = () => {
    const storedCourseState = localStorage.getItem("courseState");
    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};
    const updatedState = {
      ...currentState,
      chapterId: chapter._id,
      chapterName: chapter.title,
      topicsCount: chapter.topicsCount,
    };
    localStorage.setItem("courseState", JSON.stringify(updatedState));
    setCurrentOpenChapterIndex((prevId) =>
      prevId === chapter._id ? null : chapter._id
    );
    setCurrentOpenChapterHeight(chapter?.topicsCount * 40 + 40 - 10);
  };

  useEffect(() => {
    const courseState = JSON.parse(localStorage.getItem("courseState")) || {};
    if (courseState) {
      setCurrentOpenChapterIndex(courseState.chapterId);
      setCurrentOpenChapterHeight(courseState.topicsCount * 40 + 40 - 10);
    } else {
      setCurrentOpenChapterIndex(chapterId);
    }
  }, []);

  return (
    <motion.div
      className={styles.itemWrapper}
      style={{
        minHeight:
          chapter._id === currentOpenChapterIndex
            ? currentOpenChapterHeight
            : "auto",
      }}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
        hidden: { opacity: 1 },
      }}
      initial="hidden"
      animate={currentOpenChapterIndex === chapter._id ? "visible" : "hidden"}
    >
      <Link
        className={styles.itemWrapper__titleWrapper}
        onClick={handleClick}
        href={
          chapter.topics && chapter.topics.length > 0
            ? `${chapter.topics[0]?._id}`
            : "#"
        }
      >
        <p>{chapter.title}</p>
      </Link>
      <SubList topicIds={topicIds} chapter={chapter} params={params} />
    </motion.div>
  );
};

export default AccordionItem;
