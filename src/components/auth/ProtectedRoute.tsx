
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/types';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  if (!isAuthenticated) {

    return <Navigate to="/login" replace />;
  }


  return children;
}

export default ProtectedRoute;