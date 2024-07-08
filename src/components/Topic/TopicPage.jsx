"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/topicPage.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import useSWR from "swr";
import { fetchChapters } from "@/lib/api/public/chaptersApi";

const fetcher = (courseId) => fetchChapters(courseId);

const TopicPage = ({ children, params }) => {
  const [show, setShow] = useState(false);
  const { data, error, isLoading } = useSWR([params.courseId], fetcher);
  return (
    <div className={styles.topicPageWrapper}>
      <div className={styles.topicPageWrapper__pageInnerWrapper}>
        <Sidebar
          params={params}
          accordionListData={data}
          show={show}
          setShow={setShow}
        />
        <MainContent
          children={children}
          params={params}
          show={show}
          setShow={setShow}
        />
      </div>
    </div>
  );
};

export default TopicPage;
