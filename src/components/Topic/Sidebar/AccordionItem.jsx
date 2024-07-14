import React from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import SubList from "./SubList";

const AccordionItem = ({ chapter, currOpenItemId, currOpenItemHeight }) => {
  const params = useParams();
  const { courseName, courseId } = params;

  const handleClick = () => {
    const storedCourseState = localStorage.getItem("courseState");
    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};
    const updatedState = {
      ...currentState,
      chapterId: chapter._id,
      chapterName: chapter.title,
    };
    localStorage.setItem("courseState", JSON.stringify(updatedState));
  };

  return (
    <div
      className={styles.itemWrapper}
      style={{
        minHeight: chapter._id === currOpenItemId ? currOpenItemHeight : "auto",
      }}
    >
      <Link
        className={styles.itemWrapper__titleWrapper}
        onClick={handleClick}
        href={
          chapter.topics && chapter.topics.length > 0
            ? `/content/courses/${courseName}/${courseId}/chapters/${chapter.slug}/${chapter._id}/topic/${chapter.topics[0]?.slug}/${chapter.topics[0]?._id}`
            : "#"
        }
      >
        <p>{chapter.title}</p>
      </Link>
      <SubList chapter={chapter} params={params} />
    </div>
  );
};

export default AccordionItem;
