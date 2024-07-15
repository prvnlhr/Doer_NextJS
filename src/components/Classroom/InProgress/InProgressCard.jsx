import React from "react";

import styles from "./styles/inProgressCard.module.scss";
import HighLightBadge from "../../Common/CardElements/HighLightBadge";
import LinkButton from "@/components/Common/Buttons/LinkButton";
const InProgressCard = () => {
  const percVal = "56.12";
  const values = percVal.split(".");
  const p_text = values[0];
  const span_text = values[1];
  return (
    <div className={styles.card}>
      <div className={styles.card__typeWrapper}>
        <div>
          <HighLightBadge text={"COURSE"} isHighlighted={true} />
        </div>
      </div>
      <div className={styles.card__titleWrapper}>
        <p>JavaScript</p>
      </div>
      <div className={styles.card__progressBarWrapper}>
        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarTrack__progressBar}></div>
        </div>
      </div>
      <div className={styles.card__progressPercWrapper}>
        <div className={styles.valueWrapper}>
          <p>
            {p_text}
            <span>{span_text ? `.${span_text}` : ""}%</span>
          </p>
        </div>
        <div className={styles.lableWrapper}>
          <p>PROGRESS</p>
        </div>
      </div>
      <div className={styles.card__completedWrapper}>
        <div className={styles.valueWrapper}>
          <p>
            {"06"}
            <span>/{"24"}</span>
          </p>
        </div>
        <div className={styles.lableWrapper}>
          <p>CHAPTERES COMPLETED</p>
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <LinkButton to={"#"} />
      </div>
    </div>
  );
};

export default InProgressCard;
