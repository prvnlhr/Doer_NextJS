import React, { useEffect, useState } from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";
import { useAppState } from "@/context/AppContext";

const Accordion = ({ accordionListData, params }) => {
  const [currOpenItemId, setCurrOpenItemId] = useState(null);
  const [currOpenItemHeight, setCurrOpenItemHeight] = useState();
  const { courseState, setCourseState } = useAppState();

  useEffect(() => {
    if (accordionListData) {
      setCurrOpenItemHeight(
        accordionListData.filter((ch) => ch._id === params.chapterId)[0]
          .topicsCount *
          40 +
          40
      );
    }

    // setCourseState((prevState) => ({
    //   ...prevState,
    //   topicName: "",
    // }));
    // console.log(params);
    setCurrOpenItemId(params.chapterId);
  }, [params.chapterId, accordionListData]);

  return (
    <>
      <div className={styles.accordHeaderWrapper}></div>
      <div className={styles.accordListWrapper}>
        {accordionListData &&
          accordionListData.map(
            (chapter, indx) =>
              chapter?.topicsCount > 0 && (
                <AccordionItem
                  key={indx}
                  chapter={chapter}
                  currOpenItemId={currOpenItemId}
                  currOpenItemHeight={currOpenItemHeight}
                />
              )
          )}
      </div>
    </>
  );
};

export default Accordion;
