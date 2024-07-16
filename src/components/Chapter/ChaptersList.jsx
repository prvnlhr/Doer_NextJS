import React from "react";
import styles from "./styles/chaptersList.module.scss";
import ChapterCard from "./ChapterCard";
import CommonHeading from "../Common/Heading/CommonHeading";

const ChaptersList = ({ chapters, params }) => {
  return (
    <div className={styles.chaptersListWrapper}>
      <div className={styles.listHeader}>
        <CommonHeading to="/content/courses" text="CHAPTERS" />
      </div>
      <div className={styles.mainListWrapper}>
        {chapters.map(
          (chapter, index) =>
            chapter?.topics?.length > 0 && (
              <ChapterCard key={chapter._id} index={index} chapter={chapter} />
            )
        )}
      </div>
    </div>
  );
};

export default ChaptersList;
