import React, { createContext, useContext, useState } from "react";

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

  return (
    <AppStateContext.Provider
      value={{
        courseState,
        setCourseState,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
