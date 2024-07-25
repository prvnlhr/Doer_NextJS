"use client";
import React, { useEffect } from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import SubList from "./SubList";
import { motion } from "framer-motion";

const AccordionItem = ({ chapter }) => {
  const params = useParams();
  const { chapterId } = params;

  const {
    currentOpenChapterIndex,
    setCurrentOpenChapterIndex,
    currentOpenChapterHeight,
    setCurrentOpenChapterHeight,
    setCourseState,
  } = useAppState();

  const handleClick = () => {
    const storedCourseState = localStorage.getItem("courseState");
    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};
    const updatedState = {
      ...currentState,
      chapterId: chapter._id,
      chapterName: chapter.title,
      topicsCount: chapter.topicsCount,
      topicId: chapter.topics[0]._id,
      topicName: chapter.topics[0].title,
    };
    localStorage.setItem("courseState", JSON.stringify(updatedState));
    setCurrentOpenChapterIndex((prevId) =>
      prevId === chapter._id ? null : chapter._id
    );
    setCurrentOpenChapterHeight(chapter?.topicsCount * 50 + 40);
    setCourseState(updatedState);
  };

  useEffect(() => {
    const courseState = JSON.parse(localStorage.getItem("courseState")) || {};
    if (courseState) {
      setCurrentOpenChapterIndex(courseState.chapterId);
      setCurrentOpenChapterHeight(courseState.topicsCount * 50 + 40);
    } else {
      setCurrentOpenChapterIndex(chapterId);
    }
    setCourseState(courseState);
  }, []);

  return (
    <motion.div
      className={styles.itemWrapper}
      style={{
        minHeight:
          chapter._id === currentOpenChapterIndex
            ? currentOpenChapterHeight
            : "40px",
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
      <SubList chapter={chapter} params={params} />
    </motion.div>
  );
};

export default AccordionItem;
