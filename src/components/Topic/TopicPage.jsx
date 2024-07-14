"use client";
import React from "react";
import styles from "./styles/topicPage.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import MainView from "./MainView/MainView";

const TopicPage = ({ children, params }) => {
  return (
    <div className={styles.topicPageWrapper}>
      <div className={styles.topicPageWrapper__pageInnerWrapper}>
        <Sidebar params={params} />
        <MainView children={children} params={params} />
      </div>
    </div>
  );
};

export default TopicPage;
