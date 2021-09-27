import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import computerServices from "../../services/computerServices";
import Loader from '../../assets/images/loader.gif'

function UpdateComputerModal({ onClose, openPopUp, updateId, getComputers }) {
  const [description, setDescription] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMsgVisible, setIsErrorMsgVisible] = useState(false);

  const exitModal = (e) => {
    if (e.target.id === "modal") onClose();
  };

  useEffect(() => {
    getComputerById(updateId);
  }, [updateId]);

  const getComputerById = async (id) => {
    const request = await computerServices.getComputerById(id);
    setDescription(request.result[0].DESCRIPTION);
    
  };

  const onChange = (e) => {
    if (e.target.id === "descricao") setDescription(e.target.value);  
  };

  const updateComputer = async () => {
    setIsLoading(true)
    const msg = await computerServices.updateComputer(
      description, updateId
      
    );
    setIsLoading(false)
    if (msg.Message) {
      setIsErrorMsgVisible(false);
      onClose();
      openPopUp(msg.Message);
      getComputers();
    } else {
      setErrorMsg(msg.error);
      console.log(msg);
      setIsErrorMsgVisible(true);
    }
  };

  return (
    <Modal onClick={(e) => exitModal(e)} id="modal">
    <Container>
      <h2 onClick={(e) => exitModal(e)} id="modal">
        ✖
      </h2>
      <h1>Atualizar Equipamento</h1>
      <TxtArea
       
        id="descricao"
        placeholder="Descreva o Equiepamento"
        onChange={onChange}
        value={description}
        rows='8'
        required
      />    
  
      <button onClick={updateComputer}>Atualizar</button>
      {isErrorMsgVisible ? <p>{errorMsg}</p> : null}
      {isLoading ? <Logo src={Loader} /> : null}
    </Container>
  </Modal>
  );
}

export default UpdateComputerModal;

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
  padding: 15px 15px 70px 15px;
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

  h1 {
    color: #ffd000;
    font-size: 25px;
    text-align: center;
    font-weight: bolder;
    text-transform: uppercase;
  }

  h2 {
    color: #ffd000;
    font-weight: bolder;
    align-self: flex-end;
    margin: 0px;
    cursor: pointer;
  }
`;

const TxtArea = styled.textarea`  
  font-weight: bold;
  font-size: 18px;
  margin: 7px 0px;
  ::placeholder {
    font-weight: bolder;
  }
`;
const Logo = styled.img`
  width: 30px;
  margin: 20px auto;
`;
