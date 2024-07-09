import React, { useEffect, useState } from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";

const Accordion = ({ accordionListData, params }) => {
  const [currOpenItemId, setCurrOpenItemId] = useState(null);
  const [currOpenItemHeight, setCurrOpenItemHeight] = useState();

  useEffect(() => {
    if (accordionListData) {
      setCurrOpenItemHeight(
        accordionListData.filter((ch) => ch._id === params.chapterId)[0]
          .topicsCount *
          40 +
          40
      );
    }
    setCurrOpenItemId(params.chapterId);
  }, [params.chapterId, accordionListData]);

  return (
    <>
      <div className={styles.accordHeaderWrapper}></div>
      <div className={styles.accordListWrapper}>
        {accordionListData &&
          accordionListData.map((chapter, indx) => (
            <AccordionItem
              key={indx}
              chapter={chapter}
              currOpenItemId={currOpenItemId}
              currOpenItemHeight={currOpenItemHeight}
            />
          ))}
      </div>
    </>
  );
};

export default Accordion;
