import React from "react";
import styles from "./styles/inProgressList.module.scss";
import InProgressCard from "./InProgressCard";
const InProgressList = () => {
  return (
    <div className={styles.listWrapper}>
      <InProgressCard />
      <InProgressCard />
      <InProgressCard />
      <InProgressCard />
    </div>
  );
};

export default InProgressList;
