import React from "react";
import styles from "./styles/chaptersList.module.scss";
import ChapterCard from "./ChapterCard";

const ChaptersList = () => {
  let chapters = [
    {
      title: "Introduction",
      id: "01-01",
      topics: [
        { title: "What is JavaScript?", id: "01-01-01" },
        { title: "History of JavaScript", id: "01-01-02" },
      ],
    },
    {
      title: "Variables and Data Types",
      id: "01-02",
      topics: [
        { title: "Variables", id: "01-02-01" },
        { title: "Data Types", id: "01-02-02" },
        { title: "Type Conversion", id: "01-02-03" },
      ],
    },
    {
      title: "Functions",
      id: "01-03",
      topics: [
        { title: "Function Declarations", id: "01-03-01" },
        { title: "Function Expressions", id: "01-03-02" },
        { title: "Arrow Functions", id: "01-03-03" },
      ],
    },
  ];

  return (
    <div className={styles.chaptersListWrapper}>
      {chapters.map((chapter) => (
        <ChapterCard key={chapter.title} chapter={chapter} />
      ))}
    </div>
  );
};

export default ChaptersList;
