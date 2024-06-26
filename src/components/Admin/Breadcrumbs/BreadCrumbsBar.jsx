"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import styles from "./styles/breadCrumbs.module.scss";
import Link from "next/link";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
const BreadCrumbsBar = () => {
  const params = useParams();
  const pathname = usePathname();

  let { courseName, chapterName, topicName } = params || {
    courseName: "",
    chapterName: "",
    topicName: "",
  };
  const normalize = (name) => name && name.replace(/\s+/g, "-");

  const normalizedCourseName = normalize(courseName);
  const normalizedChapterName = normalize(chapterName);
  const normalizedTopicName = normalize(topicName);

  const pathSegments = pathname
    .split("/")
    .filter(
      (seg) => !["admin", courseName, chapterName, topicName, ""].includes(seg)
    );

  let links = {
    courses: `/admin/courses`,
    chapters: `/admin/courses/${normalizedCourseName}/chapters`,
    topics: `/admin/courses/${normalizedCourseName}/chapters/${normalizedChapterName}/topics`,
  };

  // console.log({ pathSegments, courseName, chapterName, topicName });

  return (
    <div className={styles.breadCrumbsBar}>
      {pathSegments.map((segment, index) => (
        <div className={styles.breadcrumbWrapper}>
          <Link
            className={styles.breadcrumbWrapper__link}
            href={links[segment] || "#"}
          >
            <p
              className={`${styles["breadcrumbWrapper__link--normalText"]} ${
                index === pathSegments.length - 1 &&
                styles["breadcrumbWrapper__link--currentText"]
              }`}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </p>
          </Link>
          <div className={styles.breadcrumbWrapper__iconWrapper}>
            <div className={styles.breadcrumbWrapper__iconWrapper__iconDiv}>
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbsBar;
