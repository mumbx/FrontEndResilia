import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Bottom>
      <p>© Quase todos os direitos reservados</p>
    </Bottom>
  );
}

export default Footer;

const Bottom = styled.footer`
  grid-area: footer;
  background-color: black;
  display:flex;
  width:100%;
  flex:1;
  p{
    text-decoration: none;
    font-weight: bold;
    color: #ffd000;
    text-transform: uppercase;
    font-size: 1rem;
    align-self:flex-end;    
    width:100%;
    text-align:center;
  }
`;
