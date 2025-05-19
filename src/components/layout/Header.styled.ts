import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #fffdf9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const BrandLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #555;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
  font-size: 1rem;
  color: #555;
  text-decoration: none;
  position: relative;
  padding: 0.25rem 0;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: #000;
    transition: width 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const AuthLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AuthButton = styled.button`
  background: #f7f1e9;
  border: 1px solid #e3d8cd;
  padding: 0.2rem 1.5rem;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  outline: none;
`;

export const AuthLink = styled(Link)`
  font-size: 0.95rem;
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;
