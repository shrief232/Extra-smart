import { useRecoilState } from 'recoil';
import { Navigate, useLocation } from 'react-router-dom';
import { $isAuthorized } from '../atoms/AuthAtom';

function IsNotLoggedin({ children }) {
  const [isAuthorized] = useRecoilState($isAuthorized);
  const location = useLocation();

  if (isAuthorized === undefined) {
    return null;
  }

  if (!isAuthorized?.isRegularAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default IsNotLoggedin;
