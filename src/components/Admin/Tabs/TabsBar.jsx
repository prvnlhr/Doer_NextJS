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

  // const { courseState, setCourseState } = useAppState();

  // useEffect(() => {
  //   const newState = { ...courseState };

  //   if (!courseState.courseId && params.courseId) {
  //     newState.courseId = params.courseId;
  //   }
  //   if (!courseState.chapterId && params.chapterId) {
  //     newState.chapterId = params.chapterId;
  //   }
  //   if (!courseState.topicId && params.topicId) {
  //     newState.topicId = params.topicId;
  //   }

  //   if (
  //     newState.courseId !== courseState.courseId ||
  //     newState.chapterId !== courseState.chapterId ||
  //     newState.topicId !== courseState.topicId
  //   ) {
  //     setCourseState(newState);
  //   }
  // }, [params, courseState, setCourseState]);

  let { courseId, chapterId, topicId } = params;

  const lastSegment = pathSegments[pathSegments.length - 1];
  const secondLastSegment = pathSegments[pathSegments.length - 2];
  const thirdLast = pathSegments[pathSegments.length - 3];

  // useEffect(() => {
  //   console.log("params:", params, lastSegment, thirdLast, secondLastSegment);
  // }, [params, lastSegment, secondLastSegment]);

  if (lastSegment === "add") {
    let addTabProps = {
      href: currentPathName,
      pathName: currentPathName,
      label: "",
    };
    if (secondLastSegment === "courses") {
      addTabProps.label = "Add Course";
    } else if (secondLastSegment === "chapters") {
      addTabProps.label = "Add Chapter";
    } else {
      addTabProps.label = "Add Topic";
    }
    return <TabLink {...addTabProps} />;
  } else {
    let editTabProps = {
      href: "",
      pathName: currentPathName,
      label: "",
    };
    let listTabProps = {
      href: "",
      pathName: currentPathName,
      label: "",
    };
    if (
      (lastSegment === "edit" && thirdLast == "courses") ||
      (lastSegment === "chapters" && thirdLast == "courses")
    ) {
      editTabProps.href = `/admin/courses/${courseId}/edit`;
      editTabProps.label = "EDIT COURSE";

      listTabProps.href = `/admin/courses/${courseId}/chapters`;
      listTabProps.label = "CHAPTERS";
    } else if (
      (lastSegment === "edit" && thirdLast == "chapters") ||
      (lastSegment === "topics" && thirdLast == "chapters")
    ) {
      editTabProps.href = `/admin/courses/${courseId}/chapters/${chapterId}/edit`;
      editTabProps.label = "EDIT CHAPTER";

      listTabProps.href = `/admin/courses/${courseId}/chapters/${chapterId}/topics`;
      listTabProps.label = "TOPICS";
    } else if (lastSegment === "edit" && thirdLast == "topics") {
      editTabProps.href = `/admin/courses/${courseId}/chapters/${chapterId}/topics/${topicId}/edit`;
      editTabProps.label = "EDIT TOPIC";
    }
    return (
      <>
        <TabLink {...editTabProps} />
        <TabLink {...listTabProps} />
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
