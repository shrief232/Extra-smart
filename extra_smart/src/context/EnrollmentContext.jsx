// context/EnrollmentContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const EnrollmentContext = createContext();
export const useEnrollment = () => useContext(EnrollmentContext);

export const EnrollmentProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const stored = localStorage.getItem('enrolledCourses');
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await api.get('/en/courses/my-enrollments/', {
        withCredentials: true
      });
      
      const ids = res.data.map(course => course.id);
      setEnrolledCourses(ids);
      localStorage.setItem('enrolledCourses', JSON.stringify(ids));
    } catch (error) {
      console.error('Lessons Loading faild', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = (courseId) => {
    const updated = [...new Set([...enrolledCourses, courseId])];
    setEnrolledCourses(updated);
    localStorage.setItem('enrolledCourses', JSON.stringify(updated));
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, enrollInCourse, loading, fetchEnrolledCourses, }}>
      {children}
    </EnrollmentContext.Provider>
  );
};
