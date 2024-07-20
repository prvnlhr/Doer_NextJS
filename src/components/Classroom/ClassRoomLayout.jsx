import React from "react";
import styles from "./styles/classroomPage.module.scss";
import TimeSpendingsGraph from "./Graph/TimeSpendingsGraph";
import Link from "next/link";
import ChevronRightIcon from "../Common/Icons/ChevronRightIcon";
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
      <div className={styles.layoutHeader}>
        <div className={styles.breadCrumbsContainer}>
          <Link href={`/`} className={styles.link}>
            <p>Home</p>
          </Link>
          <div className={styles.chevIconContainer}>
            <div className={styles.chevIconDiv}>
              <ChevronRightIcon color={"#3D4754"} />
            </div>
          </div>
        </div>
        <div className={styles.breadCrumbsContainer}>
          <Link href={`/content/courses`} className={styles.link}>
            <p>Course</p>
          </Link>
          <div className={styles.chevIconContainer}>
            <div className={styles.chevIconDiv}>
              <ChevronRightIcon color={"#3D4754"} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.layoutScrollWrapper}>
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
                  <TimeSpendingsGraph params={params} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.subPageCell}>
            <div className={styles.cellLayout}>
              <div className={styles.cellHeader}>
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
    </div>
  );
};

export default ClassRoomLayout;
