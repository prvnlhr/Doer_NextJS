import React from "react";
import styles from "./styles/authFormIcon.module.scss";
const EmailIcon = () => {
  return (
    <svg
      className={styles.iconEmail}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 9C1.25 5.82436 3.82436 3.25 7 3.25H17C20.1756 3.25 22.75 5.82436 22.75 9V15C22.75 18.1756 20.1756 20.75 17 20.75H7C3.82436 20.75 1.25 18.1756 1.25 15V9ZM6.45 8.4C6.11863 8.15147 5.64853 8.21863 5.4 8.55C5.15147 8.88137 5.21863 9.35147 5.55 9.6L10.35 13.2C11.3278 13.9333 12.6722 13.9333 13.65 13.2L18.45 9.6C18.7814 9.35147 18.8485 8.88137 18.6 8.55C18.3515 8.21863 17.8814 8.15147 17.55 8.4L12.75 12C12.3056 12.3333 11.6944 12.3333 11.25 12L6.45 8.4Z"
        fill="#635db0"
      />
    </svg>
  );
};

export default EmailIcon;
