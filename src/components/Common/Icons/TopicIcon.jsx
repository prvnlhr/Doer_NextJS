"use client";
import React from "react";
import styles from "./styles/topicIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const TopicIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.2998 7.19482H21.2998"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.79004 12.1948H21.3"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.2998 12.1948H6.2898"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.2998 17.1948H21.2998"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TopicIcon;
