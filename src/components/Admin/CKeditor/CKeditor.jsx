"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CourseForm from "../Course/CourseForm.jsx";

const CustomEditor = dynamic(
  () => {
    return import("../../custom-editor.js");
  },
  { ssr: false, loading: () => <p> Loding...</p> }
);

const CKeditor = () => {
  const [editorData, setEditorData] = useState("Hello World");

  return (
    <>
      <CustomEditor editorData={editorData} setEditorData={setEditorData} />
    </>
  );
};

export default CKeditor;
