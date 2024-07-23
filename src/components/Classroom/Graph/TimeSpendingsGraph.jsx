"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles/timeGraph.module.scss";
import { updateUsersTimeSpentData } from "@/lib/api/public/usersApi";
import {
  convertMinutesToHoursAndMinutes,
  getLastMonday,
} from "@/lib/utils/dailyTimeSpentUtils";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TimeSpendingsGraph = ({ params }) => {
  const [weeklyTime, setWeeklyTime] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [timeSpentData, setTimeSpentData] = useState({ hours: 0, minutes: 0 });
  const { userId } = params;

  const syncAndResetData = async (userId, data) => {
    try {
      // 1. sync to DB
      await updateUsersTimeSpentData(userId, data);
      // 2. reset the localStorage
      localStorage.setItem(
        "dailyTimeSpent",
        JSON.stringify([0, 0, 0, 0, 0, 0, 0])
      );
      localStorage.setItem("totalTimeSpent", JSON.stringify(0));
      localStorage.setItem("lastSyncDate", getLastMonday().toISOString());
      setWeeklyTime([0, 0, 0, 0, 0, 0, 0]);
      setTimeSpentData({ hours: 0, minutes: 0 });
    } catch (error) {
      console.error("Error updating user stats:", error);
    }
  };

  useEffect(() => {
    const dailyTimeSpent = JSON.parse(
      localStorage.getItem("dailyTimeSpent")
    ) || [0, 0, 0, 0, 0, 0, 0];
    const lastSyncDate = new Date(localStorage.getItem("lastSyncDate") || 0);
    const currentMonday = getLastMonday();

    if (currentMonday > lastSyncDate) {
      syncAndResetData(userId, dailyTimeSpent);
    } else {
      setWeeklyTime(dailyTimeSpent);
    }

    let totalTimeInMinutes =
      JSON.parse(localStorage.getItem("totalTimeSpent")) || 0;
    const timeData = convertMinutesToHoursAndMinutes(totalTimeInMinutes);
    setTimeSpentData(timeData);
  }, [userId]);

  const maxTime = Math.max(...weeklyTime, 1);
  const currentDayIndex = new Date().getDay();
  const adjustedCurrentDayIndex =
    currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.chartHeaderWrapper}>
        <p>
          {timeSpentData.hours}
          <span>h</span> {timeSpentData.minutes}
          <span>m</span>
        </p>
      </div>
      <div className={styles.chartWrapper}>
        {weeklyTime.map((time, indx) => {
          const barHeight = `${(time / maxTime) * 100}%`;
          return (
            <div className={styles.dayElement} key={indx}>
              <div className={styles.valueBarCell}>
                <motion.div
                  className={`${styles.valueBar} ${
                    indx === adjustedCurrentDayIndex &&
                    styles["valueBar--activeDay"]
                  }`}
                  style={{ height: "0%" }}
                  animate={{ height: barHeight }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className={styles.tooltip}>
                    <div className={styles.valueWrapper}>
                      <p>
                        {convertMinutesToHoursAndMinutes(Math.ceil(time)).hours}
                        h
                      </p>
                      <p>
                        {
                          convertMinutesToHoursAndMinutes(Math.ceil(time))
                            .minutes
                        }
                        m
                      </p>
                    </div>
                    <div className={styles.labelWrapper}>
                      <div className={styles.labelDiv}>
                        <p>{daysOfWeek[indx]}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div
                className={`${styles.valueLabelCell} ${
                  indx === adjustedCurrentDayIndex &&
                  styles["valueLabelCell--activeLabelCell"]
                }`}
              >
                <p>{daysOfWeek[indx].charAt(0)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSpendingsGraph;
