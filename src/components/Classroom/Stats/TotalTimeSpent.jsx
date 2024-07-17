"use client";
import React, { useEffect, useState } from "react";

const TotalTimeSpent = () => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const totalSpentTime =
      JSON.parse(localStorage.getItem("totalTimeSpent")) || 0;
    const daysVal = Math.floor(totalSpentTime / 1440);
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