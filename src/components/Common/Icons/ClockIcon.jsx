import React from "react";
import styles from "./styles/clockIcon.module.scss";
const ClockIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11.5714"
        cy="13.4286"
        r="8.57143"
        stroke="#2B3F6C"
        strokeWidth="1.42857"
      />
      <path
        d="M9.66663 2H13.4761"
        stroke="#2B3F6C"
        strokeWidth="1.42857"
        strokeLinejoin="round"
      />
      <path
        d="M11.5714 2L11.5714 4.85714"
        stroke="#2B3F6C"
        strokeWidth="1.42857"
        strokeLinejoin="round"
      />
      <path
        d="M11.5714 13.4287L14.4286 10.5715"
        stroke="#2B3F6C"
        strokeWidth="1.42857"
        strokeLinejoin="round"
      />
      <path
        d="M17.762 6.76184L18.2382 6.28564"
        stroke="#2B3F6C"
        strokeWidth="1.42857"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
