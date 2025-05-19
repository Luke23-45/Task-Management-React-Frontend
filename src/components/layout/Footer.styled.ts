import styled from "styled-components";

const colors = {
  footerBg: "#1a1a1a",
  footerText: "#cccccc",
};

export const StyledFooter = styled.footer`
  background-color: ${colors.footerBg};
  color: ${colors.footerText};
  padding: 30px 20px;
  text-align: center;
  margin-top: 50px;

  width: 100%;
  box-sizing: border-box;
`;

export const CopyrightText = styled.p`
  margin: 0;
  font-size: 0.9em;
`;
