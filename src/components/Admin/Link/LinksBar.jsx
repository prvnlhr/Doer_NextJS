"use client";
import React from "react";
import styles from "./styles/linksBar.module.scss";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const LinkComponent = () => {
  const params = useParams();

  let { courseName, chapterName, topicName } = params;
  const normalizedCourseName = courseName && courseName.replace(/\s+/g, "-");
  const normalizedChapterName = chapterName && chapterName.replace(/\s+/g, "-");
  const normalizedTopicName = topicName && topicName.replace(/\s+/g, "-");

  const pathname = usePathname();

  const pathNames = pathname.split("/");
  const lastKey = pathNames[pathNames.length - 1];

  if (lastKey === "add") {
    const contentType = pathNames[pathNames.length - 2];

    // courses/add, chapters/add, topics/add
    switch (contentType) {
      case "courses":
        return (
          <Link
            href="#"
            className={`${styles.linksBar__link} ${
              pathname === "/admin/courses/add" &&
              styles["linksBar__link--active"]
            }`}
            passHref
          >
            <p>ADD COURSE</p>
          </Link>
        );
      case "chapters":
        return (
          <Link
            href="#"
            className={`${styles.linksBar__link} ${
              pathname ===
                `/admin/courses/${normalizedCourseName}/chapters/add` &&
              styles["linksBar__link--active"]
            }`}
            passHref
          >
            <p>ADD CHAPTER</p>
          </Link>
        );
      case "topics":
        return (
          <Link
            href="#"
            className={`${styles.linksBar__link} ${
              pathname ===
                `/admin/courses/${normalizedCourseName}/chapters/${normalizedChapterName}/topics/add` &&
              styles["linksBar__link--active"]
            }`}
            passHref
          >
            <p>ADD TOPIC</p>
          </Link>
        );
      default:
        break;
    }
  } else if (lastKey === "edit" || ["chapters", "topics"].includes(lastKey)) {
    const contentType = pathNames[pathNames.length - 3];

    switch (contentType) {
      case "courses":
        return (
          <>
            <Link
              href={`/admin/courses/${normalizedCourseName}/edit`}
              as={`/admin/courses/${encodeURIComponent(
                normalizedCourseName
              )}/edit`}
              className={`${styles.linksBar__link} ${
                pathname ===
                  `/admin/courses/${encodeURIComponent(
                    normalizedCourseName
                  )}/edit` && styles["linksBar__link--active"]
              }`}
              passHref
            >
              <p>EDIT COURSE</p>
            </Link>
            <Link
              href={`/admin/courses/${normalizedCourseName}/chapters`}
              as={`/admin/courses/${encodeURIComponent(
                normalizedCourseName
              )}/chapters`}
              className={`${styles.linksBar__link} ${
                pathname ===
                  `/admin/courses/${encodeURIComponent(
                    normalizedCourseName
                  )}/chapters` && styles["linksBar__link--active"]
              }`}
              passHref
            >
              <p>CHAPTERS</p>
            </Link>
          </>
        );
      case "chapters":
        return (
          <>
            <Link
              href={`/admin/courses/${normalizedCourseName}/chapters/${normalizedChapterName}/edit`}
              as={`/admin/courses/${encodeURIComponent(
                normalizedCourseName
              )}/chapters/${encodeURIComponent(normalizedChapterName)}/edit`}
              className={`${styles.linksBar__link} ${
                pathname ===
                  `/admin/courses/${encodeURIComponent(
                    normalizedCourseName
                  )}/chapters/${encodeURIComponent(
                    normalizedChapterName
                  )}/edit` && styles["linksBar__link--active"]
              }`}
              passHref
            >
              <p>EDIT CHAPTERS</p>
            </Link>
            <Link
              href={`/admin/courses/${normalizedCourseName}/chapters/${normalizedChapterName}/topics`}
              as={`/admin/courses/${encodeURIComponent(
                normalizedCourseName
              )}/chapters/${encodeURIComponent(normalizedChapterName)}/topics`}
              className={`${styles.linksBar__link} ${
                pathname ===
                  `/admin/courses/${encodeURIComponent(
                    normalizedCourseName
                  )}/chapters/${encodeURIComponent(
                    normalizedChapterName
                  )}/topics` && styles["linksBar__link--active"]
              }`}
              passHref
            >
              <p>TOPICS</p>
            </Link>
          </>
        );
      case "topics":
        return (
          <Link
            href={`/admin/courses/${normalizedCourseName}/chapters/${normalizedChapterName}/topics/[topicName]/edit`}
            as={`/admin/courses/${encodeURIComponent(
              normalizedCourseName
            )}/chapters/${encodeURIComponent(
              normalizedChapterName
            )}/topics/${encodeURIComponent(normalizedTopicName)}/edit`}
            className={`${styles.linksBar__link} ${
              pathname ===
                `/admin/courses/${encodeURIComponent(
                  normalizedCourseName
                )}/chapters/${encodeURIComponent(
                  normalizedChapterName
                )}/topics/${encodeURIComponent(normalizedTopicName)}/edit` &&
              styles["linksBar__link--active"]
            }`}
            passHref
          >
            <p>EDIT TOPIC</p>
          </Link>
        );
      default:
        break;
    }
  }

  return null;
};

const LinksBar = () => {
  return (
    <div className={styles.linksBar}>
      <LinkComponent />
    </div>
  );
};

export default LinksBar;
