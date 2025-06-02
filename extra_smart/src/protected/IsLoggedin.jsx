import React from 'react';
import { Navigate } from 'react-router-dom';
import { $isAuthorized } from '../atoms/AuthAtom';
import { useRecoilState } from 'recoil';

function IsLoggedin({ children }) {
  const [isAuthorized] = useRecoilState($isAuthorized);

  if (isAuthorized === undefined) {
    return null;
  }

  if (isAuthorized?.isRegularAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default IsLoggedin;
