"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("../../custom-editor.js");
  },
  { ssr: false, loading: () => <p> Loading...</p> }
);

const CKeditor = ({ setFieldValue }) => {
  return (
    <>
      <CustomEditor setFieldValue={setFieldValue} />
    </>
  );
};

export default CKeditor;
