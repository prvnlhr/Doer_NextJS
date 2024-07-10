"use client";
import React from "react";
import { animate, motion } from "framer-motion";
import styles from "./styles/submitBtnIcon.module.scss";
const SubmitBtnIcon = () => {
  const arrow = {
    initial: { x: "0%", y: "0%" },
    animate: {
      x: "70%",
      y: "-70%",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={styles.btnWrapper}
      initial="initial"
      animate="initial"
      whileHover="animate"
    >
      <div className={styles.buttonIconDiv}>
        <motion.svg
          className={styles.buttonIconDiv__arrowIcon}
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={arrow}
        >
          <g clipPath="url(#clip0_211_155)">
            <path
              d="M1 14.6714L14.3201 1M14.3201 1V14.1246M14.3201 1H1.5328"
              stroke="white"
              strokeWidth="1.53696"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_211_155">
              <rect width="15" height="16" fill="white" />
            </clipPath>
          </defs>
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default SubmitBtnIcon;
