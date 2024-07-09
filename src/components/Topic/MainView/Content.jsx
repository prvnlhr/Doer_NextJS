"use client";
import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
// import "highlight.js/styles/night-owl.css";

const Content = ({ topic }) => {
  useEffect(() => {
    // Highlight the code blocks
    document.querySelectorAll("pre code").forEach((block) => {
      // Remove data-highlighted attribute if it exists
      if (block.dataset.highlighted) {
        delete block.dataset.highlighted;
      }
      hljs.highlightElement(block);
      block.dataset.highlighted = "yes";
    });
  }, [topic.content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: topic.content,
      }}
    />
  );
};

export default Content;
