"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const TopicDeletePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);
  return <></>;
};

export default TopicDeletePage;
