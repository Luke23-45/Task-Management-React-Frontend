
import React from 'react';




import { StyledFooter, CopyrightText } from './Footer.styled';


function Footer() {
  return (
    <StyledFooter>
      <CopyrightText> 
        &copy; {new Date().getFullYear()} Task Manager. All rights reserved. Luke co.
      </CopyrightText>
    </StyledFooter>
  );
}

export default Footer;