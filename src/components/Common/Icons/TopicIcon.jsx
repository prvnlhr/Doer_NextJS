"use client";
import React from "react";
import styles from "./styles/topicIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const TopicIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      className={styles.icon}
      // width="24"
      // height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5.75C4.58579 5.75 4.25 6.08579 4.25 6.5C4.25 6.91421 4.58579 7.25 5 7.25H19C19.4142 7.25 19.75 6.91421 19.75 6.5C19.75 6.08579 19.4142 5.75 19 5.75H5Z"
        fill="#AB9EF6"
      />
      <path
        opacity="0.3"
        d="M5 9.75C4.58579 9.75 4.25 10.0858 4.25 10.5C4.25 10.9142 4.58579 11.25 5 11.25H11C11.4142 11.25 11.75 10.9142 11.75 10.5C11.75 10.0858 11.4142 9.75 11 9.75H5Z"
        fill="#AB9EF6"
      />
      <path
        d="M5 13.75C4.58579 13.75 4.25 14.0858 4.25 14.5C4.25 14.9142 4.58579 15.25 5 15.25H19C19.4142 15.25 19.75 14.9142 19.75 14.5C19.75 14.0858 19.4142 13.75 19 13.75H5Z"
        fill="#AB9EF6"
      />
      <path
        opacity="0.3"
        d="M5 17.75C4.58579 17.75 4.25 18.0858 4.25 18.5C4.25 18.9142 4.58579 19.25 5 19.25H11C11.4142 19.25 11.75 18.9142 11.75 18.5C11.75 18.0858 11.4142 17.75 11 17.75H5Z"
        fill="#AB9EF6"
      />
    </svg>
  );
};

export default TopicIcon;
