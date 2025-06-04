import { useEffect, useState} from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './context/AuthProvider';
import { EnrollmentProvider } from './context/EnrollmentContext';
import { Box } from '@mui/material';
import { CourseProvider } from './context/CourseContext';
import { $isAuthorized } from './atoms/AuthAtom';
import { restoreSession } from './atoms/restoreSession';
import CircularProgress from '@mui/material/CircularProgress';



function AppInitializer({ children }) {
  const setAuth = useSetRecoilState($isAuthorized);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession((authData) => {
      if (authData.isAuthenticated) {
        setAuth({
          isRegularAuth: true,
          isGoogleAuth: false,
          user: authData.user || {}, 
        });
      } else {
        setAuth({
          isRegularAuth: false,
          isGoogleAuth: false,
          user: null,
        });
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box
       sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
function App() {
    return (
        <RecoilRoot>
          <AuthProvider>
            <EnrollmentProvider>
              <CourseProvider>
                <BrowserRouter >
                  <AppInitializer>
                    <AppRoutes />
                  </AppInitializer>
                </BrowserRouter>
              </CourseProvider>
            </EnrollmentProvider>
          </AuthProvider>
        </RecoilRoot>
     
     
  )
}

export default App
