import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import Menu from "../Menu/Menu"

function Header() {
  return (
    <Top>

      <Container>
        <Img src={logo} />
      </Container>

      <Container>
      <Menu />
      </Container>

    </Top>
  );
}

export default Header;

const Top = styled.header`
  grid-area: header;
  background-color: black;
  display: flex;
  flex-direction:column;
  padding: 10px;
  justify-content:space-between;
`;

const Container = styled.div`
width:100%;
display:flex;
`
const Img = styled.img`
  width: 10%;
  margin:0px auto;
`;
