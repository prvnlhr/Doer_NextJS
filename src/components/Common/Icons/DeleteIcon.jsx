"use client";
import React from "react";
import styles from "./styles/deleteIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const DeleteIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      // width="10"
      className={styles.icon}
      // height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.55135 2.31287V7.00562C2.5513 7.13964 2.57766 7.27234 2.62892 7.39616C2.68018 7.51998 2.75534 7.63249 2.8501 7.72725C2.94486 7.82201 3.05737 7.89717 3.18119 7.94843C3.30501 7.99969 3.43772 8.02605 3.57173 8.026H6.42848C6.699 8.026 6.95844 7.91854 7.14973 7.72725C7.34101 7.53596 7.44848 7.27652 7.44848 7.006V2.3125M1.73535 2.31287H8.26485Z"
        fill={theme === "dark" ? "#a399f2" : "#6167a0"}
      />
      <path
        d="M2.55135 2.31287V7.00562C2.5513 7.13964 2.57766 7.27234 2.62892 7.39616C2.68018 7.51998 2.75534 7.63249 2.8501 7.72725C2.94486 7.82201 3.05737 7.89717 3.18119 7.94843C3.30501 7.99969 3.43772 8.02605 3.57173 8.026H6.42848C6.699 8.026 6.95844 7.91854 7.14973 7.72725C7.34101 7.53596 7.44848 7.27652 7.44848 7.006V2.3125M1.73535 2.31287H8.26485"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        stroke-width="0.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.75342 2.03125V1.47363C3.75342 1.19749 3.97728 0.973633 4.25342 0.973633H5.74658C6.02272 0.973633 6.24658 1.19749 6.24658 1.47363V2.03125"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        stroke-width="0.56"
      />
      <path
        d="M4.2085 6.40186V3.71533"
        stroke="white"
        stroke-width="0.56"
        stroke-linecap="round"
      />
      <path
        d="M5.7915 6.40186V3.71533"
        stroke="white"
        stroke-width="0.56"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default DeleteIcon;
