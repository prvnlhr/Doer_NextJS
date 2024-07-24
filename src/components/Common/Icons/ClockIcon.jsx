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
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z"
        fill="#635DB0"
      />
      <path
        d="M12 8V11.7324C12 11.8996 12.0836 12.0557 12.2226 12.1484L15 14"
        stroke="#635DB0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ClockIcon;
