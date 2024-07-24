"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles/timeGraph.module.scss";
import { fetchUserTimeSpent } from "@/lib/api/public/usersApi";
import { millisecondsToHoursAndMinutes } from "@/lib/utils/dailyTimeSpentUtils";

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
  const [weeklyTimeSpent, setWeeklyTimeSpent] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totalTimeSpent, setTotalTimeSpent] = useState({
    hours: 0,
    minutes: 0,
  });
  const { userId } = params;

  const calulateTotalWeeklySpentTime = (weeklyTimeSpent) => {
    if (weeklyTimeSpent && weeklyTimeSpent.length > 0) {
      const totalTime = weeklyTimeSpent.reduce((acc, curr) => {
        return (acc += curr);
      }, 0);

      setTotalTimeSpent(millisecondsToHoursAndMinutes(totalTime));
    }
  };
  const fetchAndInitializeTimeSpendingData = async (userId) => {
    try {
      const response = await fetchUserTimeSpent(userId);
      const { weeklyTimeSpent } = response;
      setWeeklyTimeSpent(weeklyTimeSpent);
      const { hours, minutes } = millisecondsToHoursAndMinutes(81771);
      calulateTotalWeeklySpentTime(weeklyTimeSpent);
      setTotalTimeSpent({
        hours,
        minutes,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAndInitializeTimeSpendingData(userId);
    }
  }, []);

  // Variables needed to plot graph
  const maxTime = Math.max(...weeklyTimeSpent, 1);
  const currentDayIndex = new Date().getDay();
  const adjustedCurrentDayIndex =
    currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.chartHeaderWrapper}>
        <p>
          {totalTimeSpent.hours}
          <span>h</span> {totalTimeSpent.minutes}
          <span>m</span>
        </p>
      </div>
      <div className={styles.chartWrapper}>
        {weeklyTimeSpent.map((time, indx) => {
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
                      <p>{millisecondsToHoursAndMinutes(time).hours}h</p>
                      <p>{millisecondsToHoursAndMinutes(time).minutes}m</p>
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
