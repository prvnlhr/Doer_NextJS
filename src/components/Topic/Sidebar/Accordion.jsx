import React, { useEffect, useState } from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";

const Accordion = ({ accordionData, params }) => {
  const [currOpenItemId, setCurrOpenItemId] = useState();
  const [currOpenItemHeight, setCurrOpenItemHeight] = useState();

  const handleItemClicked = (clickedItemId) => {
    let subListHeight =
      accordionData.filter((chapter) => clickedItemId === chapter._id)[0]
        .topicsCount *
        30 +
      30;
    setCurrOpenItemId((prevId) =>
      prevId === clickedItemId ? null : clickedItemId
    );
    setCurrOpenItemHeight(subListHeight);
  };

  useEffect(() => {
    setCurrOpenItemHeight(
      accordionData.filter((ch) => ch._id === params.chapterId)[0].topicsCount *
        30 +
        30
    );
    setCurrOpenItemId(params.chapterId);
  }, [params.chapterId]);
  return (
    <>
      <div className={styles.accordHeaderWrapper}></div>

      <div className={styles.accordListWrapper}>
        {accordionData.map((chapter, indx) => (
          <AccordionItem
            key={indx}
            chapter={chapter}
            currOpenItemId={currOpenItemId}
            currOpenItemHeight={currOpenItemHeight}
            handleItemClicked={handleItemClicked}
          />
        ))}
      </div>
    </>
  );
};

export default Accordion;
