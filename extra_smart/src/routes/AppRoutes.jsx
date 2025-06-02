import React from 'react'
import {  Outlet, Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Courses from '../pages/home/Courses'
import DahuaIP from '../pages/DahuaIP/DahuaIP';
import DahuaHD from '../pages/DahuaHD/DahuaHD';
import Commax from '../pages/Commax/Commax';
import Evaluation from '../pages/Evaluation/Evaluation';
import Imou from '../pages/Imou/Imou';
import MyAssessment from '../pages/MyAssessment/MyAssessment';
import MyPayments from '../pages/MyPayments/MyPayments';
import Presales from '../pages/PreSales/Presales';
import Retail from '../pages/Retail/Retail';
import LoginPage from '../join/LoginPage';
import IsLoggedin from '../protected/IsLoggedin';
import IsNotLoggedin from '../protected/IsNotLoggedin';
import RegisterPage from '../join/RegisterPage';
import ProfilePage from '../pages/profile/ProfilePage';
import IPFinal from '../pages/MyAssessment/finalPages/IPFinal';
import HDFinal from '../pages/MyAssessment/finalPages/HDFinal';

export default function AppRoutes() {
  
  const CoursePageWrapper = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    
    const handleLessonSelect = (lesson) => {
      navigate(`/course/${courseId}/lesson/${lesson.id}`);
    };
  
    return (
      <CoursePage 
        courseId={courseId} 
        onLessonSelect={handleLessonSelect}
        initialLessonId={lessonId}
      />
    );
  };

  return (
    
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<IsNotLoggedin><Outlet /></IsNotLoggedin>}>
            <Route index element={<Courses />} />
            <Route path='dahua/dahuahd' element={<DahuaHD />} />
            <Route path='dahua/dahuaip' element={<DahuaIP />} />
            <Route path='intercom/commax' element={<Commax />} />
            <Route path='assessment/evaluation' element={<Evaluation />} />
            <Route path='imou/imou' element={<Imou />} />
            <Route path='assessment/assessment' element={<MyAssessment />} />
            <Route path='finalip' element={<IPFinal />} />
            <Route path='finalhd' element={<HDFinal />} />
            
            <Route path='payments' element={<MyPayments />} />
            <Route path='sales/presales' element={<Presales />} />
            <Route path='sales/retail' element={<Retail />} /> 
            <Route path='profile' element={<ProfilePage />} />
            <Route path='course/:courseId/lesson/:lessonId' element={<CoursePageWrapper />} />
          </Route> 
          <Route element={<IsLoggedin><Outlet /></IsLoggedin>}>
            <Route path='login' element={<LoginPage />} /> 
            <Route path='register' element={<RegisterPage />} /> 
          </Route>
        </Route>
      </Routes>    
    
  )
}
