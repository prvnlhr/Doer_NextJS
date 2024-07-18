import React from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";

const Accordion = ({ topicIds, accordionListData, params }) => {
  return (
    <>
      <div className={styles.accordHeaderWrapper}>
        <div className={styles.headerTitleDiv}>
          <p>Table of Content</p>
        </div>
      </div>
      <div className={styles.accordListWrapper}>
        {accordionListData &&
          accordionListData.map(
            (chapter) =>
              chapter?.topicsCount > 0 && (
                <AccordionItem
                  topicIds={topicIds}
                  key={chapter._id}
                  chapter={chapter}
                />
              )
          )}
      </div>
    </>
  );
};

export default Accordion;
