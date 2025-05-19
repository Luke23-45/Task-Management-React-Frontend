import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/types';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice';

import {
  StyledHeader,
  BrandLink,
  NavList,
  NavItem,
  NavLink,
  AuthLinksContainer,
  AuthButton,
  AuthLink,
} from './Header.styled';

const Header: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out…');
    dispatch(logout());
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  return (
    <StyledHeader>

      <BrandLink to="/">Task Manager</BrandLink>


      <nav>
        <NavList>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          {isAuthenticated && (
            <NavItem>
              <NavLink to="/tasks">Tasks</NavLink>
            </NavItem>
          )}
        </NavList>
      </nav>

  
      <AuthLinksContainer>
        {isAuthenticated ? (
          <AuthButton onClick={handleLogout}>Logout</AuthButton>
        ) : (
          <>
            <AuthLink to="/login">Login</AuthLink>
          
          </>
        )}
      </AuthLinksContainer>
    </StyledHeader>
  );
};

export default Header;
