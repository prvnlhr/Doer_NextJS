import React from "react";
import styles from "./styles/stats.module.scss";
import DaysSpentIcon from "@/components/Common/Icons/DaysSpentIcon";
import CourseCompletedIcon from "@/components/Common/Icons/CourseCompletedIcon";
import { auth } from "../../../auth";
import TotalTimeSpent from "./TotalTimeSpent";

const Stats = async () => {
  const session = await auth();
  return (
    <div className={styles.statsWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.userInfoWrapper}>
          <div className={styles.nameWrapper}>
            {session?.user?.name && (
              <p>
                Hello, <span>{session.user.name}</span>
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
            <div className={styles.labelCell}>
              <p>Days Spent</p>
            </div>
            <div className={styles.valueCell}>
              <TotalTimeSpent />
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
            <div className={styles.labelCell}>
              <p>Completed</p>
            </div>
            <div className={styles.valueCell}>
              <p>
                2 <span>Courses</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
