import React from "react";
import styles from "./styles/bookmarksList.module.scss";
import BookmarkCard from "./BookmarkCard";
const BookmarksList = () => {
  return (
    <div className={styles.listWrapper}>
      <BookmarkCard />
      <BookmarkCard />
      <BookmarkCard />
      <BookmarkCard />
      <BookmarkCard />
    </div>
  );
};

export default BookmarksList;
