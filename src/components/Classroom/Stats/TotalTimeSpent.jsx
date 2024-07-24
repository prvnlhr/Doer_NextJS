import React from "react";
const TotalTimeSpent = ({ totalTimeSpent, userId }) => {
  function convertMillisecondsToDays(ms) {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const days = Math.floor(ms / millisecondsInADay);
    return days;
  }

  return (
    <>
      <p>{convertMillisecondsToDays(totalTimeSpent)}</p>
    </>
  );
};

export default TotalTimeSpent;
