import React from "react";
import styles from "./styles/chaptersList.module.scss";
import ChapterCard from "./ChapterCard";
import CommonHeading from "../Common/Heading/CommonHeading";
import SearchPage from "../Search/SearchPage";
const ChaptersList = ({ chapters, searchParams }) => {
  const { item: searchedItemId } = searchParams || {};
  const sortedChapters = searchedItemId
    ? [...chapters].sort((a, b) => {
        if (a._id === searchedItemId) return -1;
        if (b._id === searchedItemId) return 1;
        return 0;
      })
    : chapters;
  return (
    <>
      {searchParams && searchParams.search && <SearchPage />}
      <div className={styles.chaptersListWrapper}>
        <div className={styles.listHeader}>
          <CommonHeading
            searchParams={searchParams}
            to="/content/courses"
            text="CHAPTERS"
          />
        </div>
        <div className={styles.mainListWrapper}>
          {sortedChapters.map(
            (chapter, index) =>
              chapter?.topics?.length > 0 && (
                <ChapterCard
                  key={chapter._id}
                  index={index}
                  chapter={chapter}
                  searchParams={searchParams}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ChaptersList;
