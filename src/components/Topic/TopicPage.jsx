"use client";
import React, { useState } from "react";
import styles from "./styles/topicPage.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import MainView from "./MainView/MainView";

const TopicPage = ({ children, params }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.topicPageWrapper}>
      <div className={styles.topicPageWrapper__pageInnerWrapper}>
        <Sidebar params={params} show={show} setShow={setShow} />
        <MainView
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
