"use client";
import React from "react";
import { useParams } from "next/navigation";

const TopicsPage = () => {
  const params = useParams();
  const { courseName, chapterName } = params;
  return <div>TopicsPage</div>;
};

export default TopicsPage;
