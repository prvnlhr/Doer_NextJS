"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { animate, motion } from "framer-motion";
import styles from "./styles/linkButton.module.scss";
import { useAppState } from "@/context/AppContext";

const LinkButton = ({ to, linkProps }) => {
  const { courseState, setCourseState } = useAppState();

  useEffect(() => {
    if (linkProps) {
      setCourseState((prevState) => ({
        ...prevState,
        ...linkProps,
      }));
    }
  }, [linkProps, setCourseState]);

  const animationVariant = {
    initial: {
      x: 0,
      y: 0,
    },
    animate: {
      x: 5,
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const arrow = {
    initial: { x: 0, y: 0 },
    animate: { x: 5, y: -5 },
  };

  return (
    <motion.div
      className={styles.btnWrapper}
      initial="initial"
      animate="initial"
      whileHover="animate"
    >
      <Link href={to} className={styles.linkBtn}>
        <motion.svg
          className={styles.linkBtn__arrowIcon}
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
      </Link>
    </motion.div>
  );
};

export default LinkButton;

/*
<Link href={to} className={styles.linkBtn}>
      <svg
        className={styles.linkBtn__arrowIcon}
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 2 }}
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
      </svg>
    </Link>
*/
