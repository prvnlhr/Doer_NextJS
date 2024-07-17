"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles/timeGraph.module.scss";
import { updateUserStats } from "@/lib/api/public/usersApi";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getLastMonday = () => {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday being the start of the week
  const lastMonday = new Date(date.setDate(diff));
  lastMonday.setHours(0, 0, 0, 0); // Reset time to the start of the day
  return lastMonday;
};

function convertMinutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}
const TimeSpendingsGraph = ({ params }) => {
  const [weeklyTime, setWeeklyTime] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totalTimeSpentMin, setTotalTimeSpentMin] = useState(0);
  const [timeSpentData, setTimeSpentData] = useState({ hours: 0, minutes: 0 });
  const { userId } = params;

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("dailyTimeSpent")
    ) || [0, 0, 0, 0, 0, 0, 0];
    const lastSyncDate = new Date(localStorage.getItem("lastSyncDate") || 0);
    const currentMonday = getLastMonday();

    const syncData = async () => {
      try {
        await updateUserStats(userId, localStorageData);
        localStorage.setItem(
          "dailyTimeSpent",
          JSON.stringify([0, 0, 0, 0, 0, 0, 0])
        );
        localStorage.setItem("lastSyncDate", currentMonday.toISOString());
        setWeeklyTime([0, 0, 0, 0, 0, 0, 0]);
      } catch (error) {
        console.error("Error updating user stats:", error);
      }
    };

    if (currentMonday > lastSyncDate) {
      syncData();
    } else {
      setWeeklyTime(localStorageData);
    }

    const totalTime = JSON.parse(localStorage.getItem("totalTimeSpent")) || 0;
    setTotalTimeSpentMin(totalTime);
  }, [userId]);

  useEffect(() => {
    const timeData = convertMinutesToHoursAndMinutes(totalTimeSpentMin);
    setTimeSpentData(timeData);
  }, [totalTimeSpentMin]);

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
                        h{" "}
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
