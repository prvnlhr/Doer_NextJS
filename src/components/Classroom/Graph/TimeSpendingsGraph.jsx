"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles/timeGraph.module.scss";
import { convertMinutesToHours } from "@/lib/utils/durationConvert";

const TimeSpendingsGraph = () => {
  const [weeklyTime, setWeeklyTime] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem("weeklyTime"));
    if (localStorageData) {
      setWeeklyTime(localStorageData);
    }
  }, []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const maxTime = Math.max(...weeklyTime, 1);
  const currentDayIndex = new Date().getDay();
  const adjustedCurrentDayIndex =
    currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  const totalTime = weeklyTime.reduce((acc, time) => acc + time, 0);
  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = Math.ceil(totalTime) % 60;
  const totalTimeFormatted = [totalHours, totalMinutes];

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.chartHeaderWrapper}>
        <p>
          {totalTimeFormatted[0]}
          <span>h</span> {totalTimeFormatted[1]}
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
                      <p>{convertMinutesToHours(Math.ceil(time))}</p>
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
