"use client";
import React, { useState } from "react";
import styles from "./styles/topicPage.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
const TopicPage = () => {
  const [show, setShow] = useState(true);
  return (
    <div
      className={styles.topicPageWrapper}
      onClick={() => setShow((prev) => !prev)}
    >
      <div className={styles.topicPageWrapper__pageInnerWrapper}>
        <Sidebar show={show} setShow={setShow} />
        <MainContent show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default TopicPage;
