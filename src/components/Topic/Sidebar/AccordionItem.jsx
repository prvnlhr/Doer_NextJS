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
            ? `/content/courses/${courseName}/${courseId}/chapters/${
                chapter.slug
              }/${chapter._id}/topic/${generateSlug(chapter.topics[0]?.slug)}/${
                chapter.topics[0]?._id
              }`
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
