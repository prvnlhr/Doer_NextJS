"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles/classroomPage.module.scss";
const SubPageNavbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.titleDiv}>
          <Link
            className={`${styles.headerLink} ${
              pathname === "/classroom/inprogress" &&
              styles["headerLink--active"]
            }`}
            href="/classroom/inprogress"
          >
            <p>IN PROGRESS</p>
          </Link>
        </div>
        {pathname === "/classroom/inprogress" && (
          <div className={styles.titleLine}></div>
        )}
      </div>
      <div className={`${styles.titleWrapper} ${styles.titleWrapperLastChild}`}>
        <div className={styles.titleDiv}>
          <Link
            className={`${styles.headerLink} ${
              pathname === "/classroom/lastopened" &&
              styles["headerLink--active"]
            }`}
            href="/classroom/lastopened"
          >
            <p>LAST OPENED</p>
          </Link>
        </div>
        {pathname === "/classroom/lastopened" && (
          <div className={styles.titleLine}></div>
        )}
      </div>
    </>
  );
};

export default SubPageNavbar;
