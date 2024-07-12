import React from "react";
import styles from "./styles/lastOpenedList.module.scss";
import LastOpenedCard from "./LastOpenedCard";

const LastOpenedList = () => {
  return (
    <div className={styles.listWrapper}>
      <LastOpenedCard />
      <LastOpenedCard />
      <LastOpenedCard />
      <LastOpenedCard />
      <LastOpenedCard />
    </div>
  );
};

export default LastOpenedList;
