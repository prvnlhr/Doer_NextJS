import React from "react";
import styles from "./styles/classroomPage.module.scss";
import InProgressCard from "./InProgress/InProgressCard";
import BookmarkCard from "./Bookmarks/BookmarkCard";
import LastOpenedCard from "./LastOpened/LastOpenedCard";
import SubPageNavbar from "./SubPageNavbar";
import BookmarksList from "./Bookmarks/BookmarksList";

const ClassRoomLayout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.layoutGrid}>
        <div className={styles.statsCell}>
          <div className={styles.cellLayout}>
            <div className={styles.cellHeader}>
              <div className={styles.titleWrapper}>
                <div className={styles.titleDiv}>
                  <p>STATS</p>
                </div>
                <div className={styles.titleLine}></div>
              </div>
            </div>
            <div className={styles.cellMain}></div>
          </div>
        </div>
        <div className={styles.graphCell}>
          <div className={styles.cellLayout}>
            <div className={styles.cellHeader}>
              <div className={styles.titleWrapper}>
                <div className={styles.titleDiv}>
                  <p>TIME SPENDINGS</p>
                </div>
                <div className={styles.titleLine}></div>
              </div>
            </div>
            <div className={styles.cellMain}></div>
          </div>
        </div>
        <div className={styles.subPageCell}>
          <div className={styles.cellLayout}>
            <div className={styles.cellHeader}>
              <SubPageNavbar />
            </div>
            <div className={styles.cellMain}>{children}</div>
          </div>
        </div>
        <div className={styles.bookmarksCell}>
          <div className={styles.cellLayout}>
            <div className={styles.cellHeader}>
              <div className={styles.titleWrapper}>
                <div className={styles.titleDiv}>
                  <p>BOOKMARKS</p>
                </div>
                <div className={styles.titleLine}></div>
              </div>
            </div>
            <div className={styles.cellMain}>
              <BookmarksList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomLayout;
