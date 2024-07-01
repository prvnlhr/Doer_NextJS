import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [courseState, setCourseState] = useState({
    courseId: "",
    chapterId: "",
    topicId: "",
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
