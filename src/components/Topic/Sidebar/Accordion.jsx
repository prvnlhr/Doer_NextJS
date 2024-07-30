"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";
import SubList from "./SubList";
import Link from "next/link";
import { chapters } from "@/components/courseData";
import { useAppState } from "@/context/AppContext";

const Accordion = ({ accordionListData, params }) => {
  const { setCurrentOpenChapterId, setCourseState } = useAppState();

  const handleClick = (chapter) => {
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
    setCurrentOpenChapterId((prevId) =>
      prevId === chapter._id ? null : chapter._id
    );
    setCourseState(updatedState);
  };

  useEffect(() => {
    const courseState = JSON.parse(localStorage.getItem("courseState")) || {};
    if (courseState) {
      setCurrentOpenChapterId(courseState.chapterId);
    } else {
      setCurrentOpenChapterId(courseState.chapterId);
    }
    setCourseState(courseState);
  }, []);

  return (
    <>
      <div className={styles.accordHeaderWrapper}>
        <div className={styles.headerTitleDiv}>
          <p>Table of Content</p>
        </div>
      </div>
      <div className={styles.mainList}>
        {accordionListData.map((chapter, index) => (
          <>
            <div key={chapter._id} className={styles.mainList__chapterWrapper}>
              <Link
                href={
                  chapter.topics && chapter.topics.length > 0
                    ? `${chapter.topics[0]?._id}`
                    : "#"
                }
                className={styles.chapterNameWrapper}
                onClick={() => handleClick(chapter)}
              >
                <p>{chapter.title}</p>
              </Link>
            </div>
            <SubList chapter={chapter} />
          </>
        ))}
      </div>
    </>
  );
};

export default Accordion;
