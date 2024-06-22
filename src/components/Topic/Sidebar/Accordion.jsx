import React, { useState } from "react";
import styles from "./styles/accordion.module.scss";
import AccordionItem from "./AccordionItem";

const Accordion = () => {
  const [currOpenItemIndx, setCurrOpenItemIndx] = useState(null);
  const [currOpenItemHeight, setCurrOpenItemHeight] = useState(0);

  let accordionData = [
    {
      chapterName: "Introduction to Programming",
      topics: [
        { topicName: "What is Programming?" },
        { topicName: "Programming Languages" },
      ],
    },
    {
      chapterName: "JavaScript Basics",
      topics: [
        { topicName: "Variables and Data Types" },
        { topicName: "Operators" },
        { topicName: "Control Flow" },
      ],
    },
    {
      chapterName: "Functions and Scope",
      topics: [
        { topicName: "Defining Functions" },
        { topicName: "Function Expressions" },
        { topicName: "Arrow Functions" },
        { topicName: "Scope and Closures" },
      ],
    },
    {
      chapterName: "Objects and Arrays",
      topics: [
        { topicName: "Creating Objects" },
        { topicName: "Object Methods" },
      ],
    },
    {
      chapterName: "Advanced JavaScript",
      topics: [
        { topicName: "Asynchronous JavaScript" },
        { topicName: "Promises" },
      ],
    },
    {
      chapterName: "DOM Manipulation",
      topics: [
        { topicName: "Selecting Elements" },
        { topicName: "Event Listeners" },
        { topicName: "Changing the DOM" },
        { topicName: "DOM Events" },
      ],
    },
    {
      chapterName: "ES6 and Beyond",
      topics: [
        { topicName: "Arrow Functions" },
        { topicName: "Template Literals" },
        { topicName: "Destructuring" },
        { topicName: "Spread and Rest Operators" },
      ],
    },
    {
      chapterName: "Web APIs",
      topics: [
        { topicName: "Fetching Data" },
        { topicName: "Working with JSON" },
        { topicName: "Error Handling" },
        { topicName: "Local Storage" },
        { topicName: "Session Storage" },
      ],
    },
    {
      chapterName: "Testing and Debugging",
      topics: [
        { topicName: "Debugging Techniques" },
        { topicName: "Unit Testing" },
      ],
    },
    {
      chapterName: "Final Project",
      topics: [
        { topicName: "Project Setup" },
        { topicName: "Building the Application" },
        { topicName: "Deployment" },
        { topicName: "Post-Deployment" },
      ],
    },
  ];
  const handleItemClicked = (clickedItemIndx) => {
    let subListHeight = accordionData[clickedItemIndx].topics.length * 30 + 30;
    setCurrOpenItemIndx((prevIndx) =>
      prevIndx === clickedItemIndx ? null : clickedItemIndx
    );
    console.log(subListHeight);
    setCurrOpenItemHeight(subListHeight);
  };

  return (
    <>
      <div className={styles.accordHeaderWrapper}></div>

      <div className={styles.accordListWrapper}>
        {accordionData.map((ele, indx) => (
          <AccordionItem
            chapter={ele}
            chapterIndx={indx}
            currOpenItemIndx={currOpenItemIndx}
            currOpenItemHeight={currOpenItemHeight}
            handleItemClicked={handleItemClicked}
          />
        ))}
      </div>
    </>
  );
};

export default Accordion;
