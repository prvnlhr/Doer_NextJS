"use client";
import React, { useState } from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";
import SubList from "./SubList";
import Link from "next/link";
import { chapters } from "@/components/courseData";
import { useAppState } from "@/context/AppContext";

const Accordion = ({ accordionListData, params }) => {
  const { setCurrentOpenChapterId } = useAppState();
  const handleClick = (chapter) => {
    setCurrentOpenChapterId((prevId) =>
      prevId === chapter._id ? null : chapter._id
    );
    console.log(chapter);
  };
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
            <div className={styles.mainList__chapterWrapper}>
              <div
                className={styles.chapterNameWrapper}
                onClick={() => handleClick(chapter)}
              >
                <p>{chapter.title}</p>
              </div>
            </div>
            <SubList chapter={chapter} />
          </>
        ))}
      </div>
    </>
  );
};

export default Accordion;
