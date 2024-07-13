"use client";
import TopicPage from "@/components/Topic/TopicPage";
import React from "react";

const TopicPageLayout = ({ children, params }) => {
  return <TopicPage params={params}>{children}</TopicPage>;
};

export default TopicPageLayout;
