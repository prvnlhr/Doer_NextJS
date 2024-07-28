"use client";
import React from "react";
import styles from "./styles/appLogo.module.scss";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const AppLogo = () => {
  const { theme } = useTheme();
  return (
    <Link className={styles.logoLink} href="/">
      <svg
        className={styles.appLogoSvgWrapper}
        viewBox="0 0 264 264"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.75247 56.8596H30.6212C43.8035 56.8596 54.4898 67.546 54.4898 80.7283V183.023C54.4898 196.205 43.8035 206.891 30.6212 206.891H6.75247V56.8596Z"
          stroke={theme === "dark" ? "white" : "black"}
          strokeWidth="9.09283"
        />
        <rect
          x="74.8882"
          y="56.8596"
          width="47.7374"
          height="150.032"
          rx="23.8687"
          stroke={theme === "dark" ? "white" : "black"}
          strokeWidth="9.09283"
        />
        <path
          d="M223.44 178.236C223.44 165.594 213.191 155.346 200.549 155.346C187.907 155.346 177.659 165.594 177.659 178.236V184.581C177.659 197.223 187.907 207.471 200.549 207.471C207.094 207.471 212.997 204.724 217.169 200.321M181.035 181.422H227.447"
          stroke={theme === "dark" ? "white" : "black"}
          strokeWidth="8.00243"
        />
        <path
          d="M238.812 211.438V177.814M261.545 159.877C248.99 159.877 238.812 167.908 238.812 177.814M238.812 177.814V153.897"
          stroke={theme === "dark" ? "white" : "black"}
          strokeWidth="8.86551"
        />
        <circle
          cx="150.159"
          cy="200.072"
          r="11.366"
          fill={theme === "dark" ? "#c7bafd" : "#635db0"}
        />
      </svg>
    </Link>
  );
};

export default AppLogo;
