import React from "react";
import styles from "./styles/lastOpenedCard.module.scss";
import HighLightBadge from "../../Common/CardElements/HighLightBadge";
import ChevronRightIcon from "../../Common/Icons/ChevronRightIcon";
import LinkButton from "@/components/Common/Buttons/LinkButton";
// import LinkButton from "../../Common/Button/LinkButton";
const BreadCrumbItem = ({ text }) => {
  return (
    <div className={styles.breadCrumbWrapper}>
      <div className={styles.breadCrumbWrapper__textWrapper}>
        <p>{text}</p>
      </div>
      <div className={styles.breadCrumbWrapper__iconWrapper}>
        <div className={styles.breadCrumbWrapper__iconWrapper__iconDiv}>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

const LastOpenedCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__continueWrapper}>
        <div className={styles.badgeContainer}>
          <HighLightBadge text={"CONTINUE"} isHighlighted={true} />
        </div>
      </div>
      <div className={styles.card__breadCrumbsWrapper}>
        <BreadCrumbItem text={"Javascript"} />
        <BreadCrumbItem text={"Function in Javascript & types"} />
      </div>
      <div className={styles.card__titleWrapper}>
        <p>Introduction to Javascript</p>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.card__linkBtnWrapper__btnDiv}>
          <LinkButton to={"#"} />
        </div>
      </div>
    </div>
  );
};

export default LastOpenedCard;
