import React from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { generateSlug } from "@/lib/utils/slugUtil";
import SubList from "./SubList";

const AccordionItem = ({ chapter, currOpenItemId, currOpenItemHeight }) => {
  const params = useParams();
  const { courseName, courseId } = params;
  return (
    <div
      className={styles.itemWrapper}
      style={{
        minHeight: chapter._id === currOpenItemId && currOpenItemHeight,
      }}
    >
      <Link
        className={styles.itemWrapper__titleWrapper}
        href={
          chapter.topics && chapter.topics.length > 0
            ? `/content/courses/${generateSlug(
                courseName
              )}/${courseId}/chapters/${generateSlug(chapter.title)}/${
                chapter._id
              }/topic/${generateSlug(chapter.topics[0]?.title)}/${
                chapter.topics[0]?._id
              }`
            : "#"
        }
      >
        <p>{chapter.title}</p>
      </Link>
      <SubList chapter={chapter} params={params} />
      {/* {chapter.topics.map((topic) => (
        <div key={topic._id} className={styles.itemWrapper__subTitleWrapper}>
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
        </div>
      ))} */}
    </div>
  );
};

export default AccordionItem;
