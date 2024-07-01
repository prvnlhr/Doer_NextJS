"use client";
import React, { useEffect } from "react";
import styles from "./styles/tabsBar.module.scss";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slugUtil";
import { useAppState } from "@/context/AppContext";

const TabLink = ({ href, pathName, label }) => {
  return (
    <>
      {label ? (
        <Link
          href={href || "#"}
          className={`${styles.linksBar__link} ${
            pathName === href && styles["linksBar__link--active"]
          }`}
        >
          <p>{label}</p>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

const Tabs = () => {
  const params = useParams();
  const currentPathName = usePathname();
  const pathSegments = currentPathName.split("/");

  const { courseState, setCourseState } = useAppState();

  useEffect(() => {
    const newState = { ...courseState };

    if (!courseState.courseId && params.courseId) {
      newState.courseId = params.courseId;
    }
    if (!courseState.chapterId && params.chapterId) {
      newState.chapterId = params.chapterId;
    }
    if (!courseState.topicId && params.topicId) {
      newState.topicId = params.topicId;
    }

    if (
      newState.courseId !== courseState.courseId ||
      newState.chapterId !== courseState.chapterId ||
      newState.topicId !== courseState.topicId
    ) {
      setCourseState(newState);
    }
  }, [params, courseState, setCourseState]);

  let { courseName, chapterName, topicName } = params;

  const courseNameSlug = courseName && generateSlug(courseName);
  const chapterNameSlug = chapterName && generateSlug(chapterName);
  const topicNameSlug = topicName && generateSlug(topicName);

  const lastSegment = pathSegments[pathSegments.length - 1];

  if (lastSegment === "add") {
    let linkProps = {
      href: currentPathName,
      pathName: currentPathName,
      label: "",
    };
    const secondLastSegment = pathSegments[pathSegments.length - 2];
    if (secondLastSegment === "courses") {
      linkProps.label = "Add Course";
    } else if (secondLastSegment === "chapters") {
      linkProps.label = "Add Chapter";
    } else {
      linkProps.label = "Add Topic";
    }
    return <TabLink {...linkProps} />;
  } else {
    let editLinkProps = {
      href: "",
      pathName: currentPathName,
      label: "",
    };
    let listLinkProps = {
      href: "",
      pathName: currentPathName,
      label: "",
    };

    if (params.hasOwnProperty("courseId") || lastSegment === "chapters") {
      editLinkProps.href = `/admin/courses/${courseNameSlug}/edit/${params.courseId}`;
      editLinkProps.label = "EDIT COURSE";

      listLinkProps.href = `/admin/courses/${courseNameSlug}/chapters`;
      listLinkProps.label = "CHAPTERS";
    } else if (params.hasOwnProperty("chapterId") || lastSegment === "topics") {
      editLinkProps.href = `/admin/courses/${courseNameSlug}/chapters/${chapterNameSlug}/edit/${params.chapterId}`;
      editLinkProps.label = "EDIT CHAPTER";

      listLinkProps.href = `/admin/courses/${courseNameSlug}/chapters/${chapterNameSlug}/topics`;
      listLinkProps.label = "TOPICS";
    } else if (params.hasOwnProperty("topicId")) {
      editLinkProps.href = `/admin/courses/${courseNameSlug}/chapters/${chapterNameSlug}/topics/${topicNameSlug}/edit/${params.topicId}`;
      editLinkProps.label = "EDIT TOPIC";

      listLinkProps.href = `/admin/courses/${courseName}/chapters`;
      listLinkProps.label = "";
    }
    return (
      <>
        <TabLink {...editLinkProps} />
        <TabLink {...listLinkProps} />
      </>
    );
  }

  return null;
};

const TabsBar = () => {
  return (
    <div className={styles.linksBar}>
      <Tabs />
    </div>
  );
};

export default TabsBar;
