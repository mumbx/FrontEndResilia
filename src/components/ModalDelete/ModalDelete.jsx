import React from "react";
import styled, { keyframes } from "styled-components";

function ModalDelete({ apiUrl, id, onDelete, openPopUp, getFunc }) {
  const handleClick = (e) => {
    if (e.target.id === "modalDelete") {
      onDelete();
    }
  };

  const deleteData = async () => {
    const deletar = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    const url = apiUrl + id;
    const deleteRespose = await fetch(url, deletar);
    const respondeMsg = await deleteRespose.json();
    onDelete()
    openPopUp(respondeMsg.Message)    
    getFunc()
  };

  return (
    <Modal id="modalDelete" onClick={handleClick}>
      <Container>
      <h2 onClick={onDelete} id='modalDelete' style={{cursor: "pointer"}}>✖</h2>
        <h2>Você realmente deseja excluir este registro?</h2>
        <div>
          <button onClick={()=>onDelete()}>Não</button>
          <button onClick={deleteData}>Sim</button>
        </div>
      </Container>
    </Modal>
  );
}

export default ModalDelete;

const openModal = keyframes`
to {
  opacity: initial;
  transform: initial;
}
`;

const moveDown = keyframes`
to {
  transform: initial;
}
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  opacity: 0;
  animation: ${openModal} 0.3s forwards;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  min-width: 500px;
  padding: 25px;
  border-radius: 9px;
  transform: translateY(-50px);
  animation: ${moveDown} 0.5s forwards;
  button {
    background-color: black;
    color: #ffd000;
    height: 30px;
    font-weight: bolder;
    text-transform: uppercase;
    width: 50%;
    align-self: center;
  }
  p {
    color: #ffd000;
    text-align: center;
    font-weight: bolder;
    padding: 20px;
  }

  h2 {
    color: #ffd000;
    font-size: 18px;
    text-align: center;
    font-weight: bolder;
    text-transform: uppercase;
    margin-bottom:15px;
  }
`;
