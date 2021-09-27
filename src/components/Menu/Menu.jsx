import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <Nav>
      <Link to="/students">Alunos</Link>
      <Link to="/computers">Equipamentos</Link>
      <Link to="/loans">Empréstimos</Link>
    </Nav>
  );
}

export default Menu;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0px auto;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #ffd000;
    text-transform: uppercase;
    font-size: 1rem;
    transition: color 0.3s, color 0.5s, trasform 3s;

    &:hover {      
      color: white;
      transform: scale(1.01);
    }
  }
`;
