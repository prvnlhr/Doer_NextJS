"use client";
import React from "react";
import styles from "./styles/clockIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const ClockIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#AB9EF6"
        strokeWidth="1.5"
      />
      <path
        opacity="0.3"
        d="M12 8V11.7324C12 11.8996 12.0836 12.0557 12.2226 12.1484L15 14"
        stroke="#AB9EF6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ClockIcon;
