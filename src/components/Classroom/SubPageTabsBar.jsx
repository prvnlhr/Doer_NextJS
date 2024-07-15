"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import React from "react";
import styles from "./styles/classroomPage.module.scss";
const SubPageTabsBar = () => {
  const pathname = usePathname();
  const params = useParams();
  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.titleDiv}>
          <Link
            className={`${styles.headerLink} ${
              pathname === `/user/${params.userId}/classroom/inprogress` &&
              styles["headerLink--active"]
            }`}
            href={`/user/${params.userId}/classroom/inprogress`}
          >
            <p>IN PROGRESS</p>
          </Link>
        </div>
        {pathname === `/user/${params.userId}/classroom/inprogress` && (
          <div className={styles.titleLine}></div>
        )}
      </div>
      <div className={`${styles.titleWrapper} ${styles.titleWrapperLastChild}`}>
        <div className={styles.titleDiv}>
          <Link
            className={`${styles.headerLink} ${
              pathname === `/user/${params.userId}/classroom/lastopened` &&
              styles["headerLink--active"]
            }`}
            href={`/user/${params.userId}/classroom/lastopened`}
          >
            <p>LAST OPENED</p>
          </Link>
        </div>
        {pathname === `/user/${params.userId}/classroom/lastopened` && (
          <div className={styles.titleLine}></div>
        )}
      </div>
    </>
  );
};

export default SubPageTabsBar;
