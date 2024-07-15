import React from "react";
import styles from "./styles/bookmarksList.module.scss";
import BookmarkCard from "./BookmarkCard";
const BookmarksList = ({ bookmarks }) => {
  return (
    <div className={styles.listWrapper}>
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark} />
      ))}
    </div>
  );
};

export default BookmarksList;
