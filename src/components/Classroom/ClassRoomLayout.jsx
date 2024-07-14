import React from "react";
import styles from "./styles/classroomPage.module.scss";
import BookmarksList from "./Bookmarks/BookmarksList";
import { fetchUserData } from "@/lib/api/public/usersApi";
import SubPageTabsBar from "./SubPageTabsBar";
const ClassRoomLayout = async ({ children, params, bookmarks }) => {
  const { userId } = params;
  const classroomData = await fetchUserData(userId);
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
              <SubPageTabsBar />
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
              <BookmarksList
                bookmarks={classroomData?.courseState.bookmarkedTopics}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomLayout;
