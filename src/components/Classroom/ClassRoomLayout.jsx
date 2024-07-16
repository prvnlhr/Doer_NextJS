import React from "react";
import styles from "./styles/classroomPage.module.scss";
import BookmarksList from "./Bookmarks/BookmarksList";
import { fetchUserData } from "@/lib/api/public/usersApi";
import SubPageTabsBar from "./SubPageTabsBar";
import InProgressList from "./InProgress/InProgressList";
import TimeSpendingsGraph from "./Graph/TimeSpendingsGraph";

const ClassRoomLayout = async ({
  children,
  stats,
  inprogress,
  bookmarks,
  params,
}) => {
  const { userId } = params;

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
            <div className={styles.cellMain}>{stats}</div>
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
            <div className={styles.cellMain}>
              <div className={styles.graphContainer}>
                <TimeSpendingsGraph />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.subPageCell}>
          <div className={styles.cellLayout}>
            <div className={styles.cellHeader}>
              {/* <SubPageTabsBar /> */}
              <div className={styles.titleWrapper}>
                <div className={styles.titleDiv}>
                  <p>IN PROGRESS</p>
                </div>
                <div className={styles.titleLine}></div>
              </div>
            </div>
            <div className={styles.cellMain}>{inprogress}</div>
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
            <div className={styles.cellMain}>{bookmarks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomLayout;
