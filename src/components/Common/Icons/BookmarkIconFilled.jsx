"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

const BookmarkIconFilled = () => {
  const { theme } = useTheme();
  return (
    <svg
      style={{ width: "100%", aspectRatio: "1/1" }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 7C4.25 4.37665 6.37665 2.25 9 2.25H15C17.6234 2.25 19.75 4.37665 19.75 7V20.1683C19.75 21.5529 18.2183 22.3891 17.0537 21.6404L12.6759 18.8261C12.2642 18.5614 11.7358 18.5614 11.3241 18.8261L6.94633 21.6404C5.78168 22.3891 4.25 21.5529 4.25 20.1683V7ZM9 7.75C8.58579 7.75 8.25 8.08579 8.25 8.5C8.25 8.91421 8.58579 9.25 9 9.25H15C15.4142 9.25 15.75 8.91421 15.75 8.5C15.75 8.08579 15.4142 7.75 15 7.75H9Z"
        fill={theme === "dark" ? "#c7bafd" : "#635db0"}
      />
    </svg>
  );
};

export default BookmarkIconFilled;
