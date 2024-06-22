import React, { useState } from "react";
import styles from "./styles/accordionItem.module.scss";
import Link from "next/link";

const AccordionItem = ({
  chapter,
  chapterIndx,
  currOpenItemIndx,
  currOpenItemHeight,
  handleItemClicked,
}) => {
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

      {chapter.topics.map((ele) => (
        <div className={styles.itemWrapper__subTitleWrapper}>
          <Link href={`{${ele.topicName.replace(/ /g, "-").toLowerCase()}}`}>
            <p>{ele.topicName}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AccordionItem;
