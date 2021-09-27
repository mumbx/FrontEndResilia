import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import studentServices from "../../services/studentServices";
import Loader from "../../assets/images/loader.gif";

function NewStudentModal({ onClose, openPopUp, getStudents }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMsgVisible, setIsErrorMsgVisible] = useState(false);

  const exitModal = (e) => {
    if (e.target.id === "modal") onClose();
  };

  const onChange = (e) => {
    if (e.target.id === "nome") setName(e.target.value);
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "dataNascimento") setBirthDate(e.target.value);
  };

  const createStudent = async () => {
    setIsLoading(true);
    const msg = await studentServices.createStudent(name, email, birthDate);
    const retorno = await msg.json();
    setIsLoading(false);
    if (retorno.Message) {
      setIsErrorMsgVisible(false);
      onClose();
      openPopUp(retorno.Message);
      getStudents();
    } else {
      setErrorMsg(retorno.error);
      setIsErrorMsgVisible(true);
    }
  };

  return (
    <Modal onClick={(e) => exitModal(e)} id="modal">
      <Container>
        <h2 onClick={(e) => exitModal(e)} id="modal">
          ✖
        </h2>
        <h1>Novo Aluno</h1>
        <Input
          type="text"
          id="nome"
          placeholder="Nome do Aluno"
          onChange={onChange}
          value={name}
          max="50"
          required
        />
        <Input
          type="email"
          id="email"
          placeholder="Email do Aluno"
          onChange={onChange}
          value={email}
          max="50"
          required
        />
        <Input
          type="date"
          id="dataNascimento"
          width="50%"
          onChange={onChange}
        />
        <button onClick={createStudent}>Criar</button>
        {isErrorMsgVisible ? <p>{errorMsg}</p> : null}
        {isLoading ? <Logo src={Loader} /> : null}
      </Container>
    </Modal>
  );
}

export default NewStudentModal;

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

const Input = styled.input`
  height: 35px;
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
