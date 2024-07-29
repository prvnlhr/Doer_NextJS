"use client";
import React from "react";
import dynamic from "next/dynamic";
import CkeditorSkeleton from "@/components/Common/Skeletons/CkeditorSkeleton.jsx";

const CustomEditor = dynamic(
  () => {
    return import("./custom-editor.js");
  },
  { ssr: false, loading: () => <CkeditorSkeleton /> }
);

const CKeditor = ({ content, setFieldValue }) => {
  return (
    <>
      <CustomEditor content={content} setFieldValue={setFieldValue} />
      {/* <CkeditorSkeleton /> */}
    </>
  );
};

export default CKeditor;
