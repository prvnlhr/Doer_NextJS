import React from "react";
import Link from "next/link";

import styles from "./styles/linkButton.module.scss";

const LinkButton = ({ to }) => {
  return (
    <Link href={to} className={styles.linkBtn}>
      <svg
        className={styles.linkBtn__arrowIcon}
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_211_155)">
          <path
            d="M1 14.6714L14.3201 1M14.3201 1V14.1246M14.3201 1H1.5328"
            stroke="white"
            stroke-width="1.53696"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_211_155">
            <rect width="15" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
};

export default LinkButton;
