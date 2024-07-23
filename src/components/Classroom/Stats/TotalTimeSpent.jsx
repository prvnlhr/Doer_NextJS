"use client";
import React, { useEffect, useState } from "react";

const TotalTimeSpent = () => {
  function convertMillisecondsToDays(ms) {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const days = Math.floor(ms / millisecondsInADay);
    return days;
  }

  const [days, setDays] = useState(0);
  useEffect(() => {
    const totalSpentTime =
      JSON.parse(localStorage.getItem("totalTimeSpent")) || 0;
    const daysVal = convertMillisecondsToDays(totalSpentTime);
    setDays(daysVal);
  }, []);

  return (
    <>
      <p>
        {days} <span>Days</span>
      </p>
    </>
  );
};

export default TotalTimeSpent;
