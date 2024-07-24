import React from "react";
import styles from "./styles/stats.module.scss";
import DaysSpentIcon from "@/components/Common/Icons/DaysSpentIcon";
import CourseCompletedIcon from "@/components/Common/Icons/CourseCompletedIcon";
import { auth } from "../../../auth";
import TotalTimeSpent from "./TotalTimeSpent";

const Stats = async ({ stats }) => {
  const session = await auth();
  const userId = session?.user?.userId;
  return (
    <div className={styles.statsWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.userInfoWrapper}>
          <div className={styles.nameWrapper}>
            {session?.user?.name && (
              <p>
                <span>Hi, </span>
                {session.user.name}
              </p>
            )}
          </div>
          <div className={styles.countryWrapper}>
            {session?.user?.name && <p>{session.user.country}</p>}
          </div>
        </div>
        <div className={styles.statsBoxContainer}>
          <div className={styles.statsBox}>
            <div className={styles.iconCell}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconDiv}>
                  <DaysSpentIcon />
                </div>
              </div>
            </div>
            <div className={styles.valueCell}>
              <TotalTimeSpent
                totalTimeSpent={stats ? stats?.totalTimeSpent : 0}
                userId={userId}
              />
            </div>
            <div className={styles.labelCell}>
              <p>Days Spent</p>
            </div>
          </div>
          <div className={styles.statsBox}>
            <div className={styles.iconCell}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconDiv}>
                  <CourseCompletedIcon />
                </div>
              </div>
            </div>
            <div className={styles.valueCell}>
              <p>{stats.totalCompleted}</p>
            </div>
            <div className={styles.labelCell}>
              <p>Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
