import React from "react";
import styles from "./styles/topicIcon.module.scss";
const TopicIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 7H4"
        stroke="#635DB0"
        stroke-width="3.482"
        stroke-linecap="round"
      />
      <path
        opacity="0.7"
        d="M15 12.0005H4"
        stroke="#635DB0"
        stroke-width="3.482"
        stroke-linecap="round"
      />
      <path
        opacity="0.4"
        d="M9 17.001H4"
        stroke="#635DB0"
        stroke-width="3.482"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default TopicIcon;
