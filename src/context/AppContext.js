import React, { createContext, use, useContext, useState } from "react";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [courseState, setCourseState] = useState({
    courseId: "",
    courseName: "",
    chapterId: "",
    chapterName: "",
    topicId: "",
    topicName: "",
  });

  const [showTopicSidebar, setShowTopicSidebar] = useState(false);

  const [currentOpenChapterIndex, setCurrentOpenChapterIndex] = useState("");
  const [currentOpenChapterHeight, setCurrentOpenChapterHeight] = useState();

  return (
    <AppStateContext.Provider
      value={{
        courseState,
        setCourseState,
        showTopicSidebar,
        setShowTopicSidebar,
        currentOpenChapterIndex,
        setCurrentOpenChapterIndex,
        currentOpenChapterHeight,
        setCurrentOpenChapterHeight,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
