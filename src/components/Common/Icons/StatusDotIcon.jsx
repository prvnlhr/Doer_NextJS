import React from "react";
import styles from "./styles/statusIcon.module.scss";
const StatusDotIcon = ({ color }) => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill={`${color}`} />
    </svg>
  );
};

export default StatusDotIcon;
