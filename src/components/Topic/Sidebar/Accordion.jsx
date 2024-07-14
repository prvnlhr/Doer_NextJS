import React from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";

const Accordion = ({ accordionListData, params }) => {
  return (
    <>
      <div className={styles.accordHeaderWrapper}></div>
      <div className={styles.accordListWrapper}>
        {accordionListData &&
          accordionListData.map(
            (chapter) =>
              chapter?.topicsCount > 0 && (
                <AccordionItem key={chapter._id} chapter={chapter} />
              )
          )}
      </div>
    </>
  );
};

export default Accordion;
