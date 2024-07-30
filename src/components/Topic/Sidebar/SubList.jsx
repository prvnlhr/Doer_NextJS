"use client";
import React, { useState } from "react";
// import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slugUtil";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import CheckedIcon from "@/components/Common/Icons/CheckedIcon";
import styles from "./styles/accordion.module.scss";

const SubList = ({ chapter, params }) => {
  const {
    setShowTopicSidebar,
    currentOpenChapterId,
    completedTopics,
    setCourseState,
    courseState,
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
    <div
      className={styles.mainList__subListWrapper}
      style={{
        height:
          currentOpenChapterId === chapter._id
            ? `${chapter.topicsCount * 40}px`
            : "0px",
      }}
    >
      {chapter.topics.map((topic) => (
        <Link
          href="#"
          className={`${styles.topicNameWrapper}  
            ${
              courseState.topicId === topic._id &&
              styles["topicNameWrapper--active"]
            }`}
        >
          <p>{topic.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default SubList;
