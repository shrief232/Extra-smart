import { createContext, useContext, useState } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [lessonsState, setLessonsState] = useState({});

  const updateLessonState = (lessonId, key, value) => {
    setLessonsState(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [key]: value
      }
    }));
  };

  return (
    <CourseContext.Provider value={{ lessonsState, updateLessonState }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);