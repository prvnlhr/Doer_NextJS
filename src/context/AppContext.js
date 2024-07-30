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

  const [courseProgressState, setCourseProgressState] = useState();
  const [completedTopics, setCompletedTopics] = useState([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState([]);

  const [showTopicSidebar, setShowTopicSidebar] = useState(false);

  const [currentOpenChapterId, setCurrentOpenChapterId] = useState("");
  const [currentOpenChapterHeight, setCurrentOpenChapterHeight] = useState();

  return (
    <AppStateContext.Provider
      value={{
        courseState,
        setCourseState,
        showTopicSidebar,
        setShowTopicSidebar,
        currentOpenChapterId,
        setCurrentOpenChapterId,
        currentOpenChapterHeight,
        setCurrentOpenChapterHeight,
        setCompletedTopics,
        completedTopics,
        setCourseProgressState,
        courseProgressState,
        bookmarkedTopics,
        setBookmarkedTopics,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
