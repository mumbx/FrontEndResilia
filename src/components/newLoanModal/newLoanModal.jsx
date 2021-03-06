import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import loanServices from "../../services/loanServices";
import studentServices from "../../services/studentServices";
import Loader from "../../assets/images/loader.gif";

function NewLoanModal({ onClose, openPopUp, getLoans }) {
  const [loanDate, setLoanDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [computerId, setComputerid] = useState(0);
  const [studentId, setStudentid] = useState(0);
  const [avaliableComputers, setAvaliableComputers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMsgVisible, setIsErrorMsgVisible] = useState(false);
  const [students, setStudents] = useState({});
  

  const exitModal = (e) => {
    if (e.target.id === "modal") onClose();
  };

  const onChange = (e) => {
    if (e.target.id === "dataEmprestimo") setLoanDate(e.target.value);
    if (e.target.id === "dataRetorno") setReturnDate(e.target.value);
    if (e.target.id === "aluno") setStudentid(parseInt(e.target.value));
    if (e.target.id === "computador") setComputerid(parseInt(e.target.value));
  };

  const createLoan = async () => {
    setIsLoading(true);
    const msg = await loanServices.createLoan(
      loanDate,
      returnDate,
      computerId,
      studentId
    );

    const retorno = await msg.json();
    setIsLoading(false);
    if (retorno.Message) {
      setIsErrorMsgVisible(false);
      onClose();
      openPopUp(retorno.Message);
      getLoans();
    } else {
      setErrorMsg(retorno.error);
      setIsErrorMsgVisible(true);
    }
  };

  useEffect(() => {
    getAvaliableComputers();
    getStudents()
  }, [avaliableComputers]);

  const getAvaliableComputers = async () => {
    const request = await loanServices.getAvaliableComputers();
    const response = request.Results;
    setAvaliableComputers(response);
  };

  const getStudents = async () => {
    const data = await studentServices.getStudents();
    const students = await data.json();
    setStudents(students.Results);    
  };

  const renderComputerOptions = () => {
    return avaliableComputers.map((computer) => (
      <option value={computer.COMPUTERNUMBER} key={computer.COMPUTERNUMBER}>{computer.DESCRIPTION}</option>
    ));
  };

  const renderStudentOptions = () => {
    return students.map((stundent) => (
      <option value={stundent.ENROLLMENTID} key={stundent.ENROLLMENTID}>{stundent.NAME}</option>
    ));
  };

  return (
    <Modal onClick={(e) => exitModal(e)} id="modal">
      <Container>
        <h2 onClick={(e) => exitModal(e)} id="modal">
          ???
        </h2>
        <h1>Novo Emprestimo</h1>
        <label htmlFor="dataEmprestimo">Data do Empr??stimo</label>
        <Input
          name="dataEmprestimo"
          type="date"
          id="dataEmprestimo"
          width="50%"
          onChange={onChange}
        />
        <label htmlFor="dataRetorno">Data do Retorno</label>
        <Input
          name="dataRetorno"
          type="date"
          id="dataRetorno"
          width="50%"
          onChange={onChange}
        />
        <Select id="aluno" onChange={onChange} onBlur={onChange}>
        {students.length > 0 ? <option selected>Escolha um aluno</option> : null}
        {students.length > 0 ? renderStudentOptions() : (
            <option>N??o existem alunos cadastrados</option>
          )}
        </Select>
        <Select id="computador" onChange={onChange} onBlur={onChange}>
          {avaliableComputers.length > 0 ? renderComputerOptions() : (
            <option>Sem equipamentos dispon??veis</option>
          )}
        </Select>

        <button onClick={createLoan}>Criar</button>
        {isErrorMsgVisible ? <p>{errorMsg}</p> : null}
        {isLoading ? <Logo src={Loader} /> : null}
      </Container>
    </Modal>
  );
}

export default NewLoanModal;

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

  label {
    color: #ffd000;
    font-weight: bolder;
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

const Select = styled.select`
  height: 35px;
  font-weight: bold;
  font-size: 18px;
  margin: 7px 0px;
  ::placeholder {
    font-weight: bolder;
  }
`;
