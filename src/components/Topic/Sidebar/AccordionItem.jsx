import React, { useState } from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";

const AccordionItem = ({
  chapter,
  chapterIndx,
  currOpenItemIndx,
  currOpenItemHeight,
  handleItemClicked,
}) => {
  function generateSlug(topicName) {
    let slug = topicName
      .toLowerCase()
      .replace(/\./g, "") // Remove dots
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .trim(); // Trim any leading or trailing whitespace

    console.log({ topicName, slug });
    return slug;
  }

  const params = useParams();
  const { courseName, chapterName } = params;
  return (
    <div
      className={styles.itemWrapper}
      style={{
        minHeight: currOpenItemIndx === chapterIndx && currOpenItemHeight,
      }}
    >
      <div
        className={styles.itemWrapper__titleWrapper}
        onClick={() => handleItemClicked(chapterIndx)}
      >
        <p>{chapter.chapterName}</p>
      </div>

      {chapter.topics.map((topic) => (
        <div
          key={topic.topicName}
          className={styles.itemWrapper__subTitleWrapper}
        >
          <Link href={`${generateSlug(topic.topicName)}`}>
            <p>{topic.topicName}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AccordionItem;
