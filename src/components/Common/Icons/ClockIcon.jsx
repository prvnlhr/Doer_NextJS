"use client";
import React from "react";
import styles from "./styles/clockIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const ClockIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.75 0C4.81294 0 0 4.81294 0 10.75C0 16.6871 4.81294 21.5 10.75 21.5C16.6871 21.5 21.5 16.6871 21.5 10.75C21.5 4.81294 16.6871 0 10.75 0Z"
        fill={theme === "dark" ? "#a399f2" : "#6167a0"}
      />
      <path
        d="M10.75 6.75V10.4824C10.75 10.6496 10.8336 10.8057 10.9726 10.8984L13.75 12.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ClockIcon;
