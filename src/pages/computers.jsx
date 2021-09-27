import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import computerServices from "../services/computerServices";
import Trash from "../assets/images/lixeira.png";
import Update from "../assets/images/editar.png";
import CreateModal from "../components/newComputerModal/newComputerModal";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import ModalUpdate from "../components/updateComputerModal/updateComputerModal";
import Loader from "../assets/images/loader.gif";

function ComputersPage() {
  const [computers, setComputers] = useState([]);
  const [isComputersLoaded, setIsComputersLoaded] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [returnMsg, setReturnMsg] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [updateId, setUpdateId] = useState(0);

  useEffect(() => {
    getComputers()
  }, []);

  const callUpdate = (e) => {
    setUpdateId(e.target.id);
    setIsModalUpdateVisible(!isModalUpdateVisible);
    window.scrollTo(0, 0);
  };

  const callDelete = (e) => {
    setDeleteId(e.target.id);
    setIsModalDeleteVisible(!isModalDeleteVisible);
    window.scrollTo(0, 0);
  };

  const getComputers = async () => {
    const data = await computerServices.getComputers();
    const computers = await data.json();
    setComputers(computers.Results);
    setIsComputersLoaded(true);
  };

  const openPopUp = (msg) => {
    setReturnMsg(msg);
    setIsPopUpVisible(true);
    setTimeout(() => {
      setIsPopUpVisible(false);
    }, 5000);
  };

  const renderComputers = () => {
    return computers.map((element) => {
      return (
        <tr key={element.COMPUTERNUMBER}>
          <td>{element.COMPUTERNUMBER}</td>
          <td>{element.DESCRIPTION}</td>         
          <td>
            <Img
              id={element.COMPUTERNUMBER}
              onClick={callUpdate}
              src={Update}
              alt="Editar"
            />
            <Img
              id={element.COMPUTERNUMBER}
              onClick={callDelete}
              src={Trash}
              alt="Deletar"
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Main>
        <Top>
          <h1>Computadores</h1>
        </Top>
        <Bottom>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição do Equipamento</th>                 
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isComputersLoaded ? (
                  computers.length > 0 ? (
                    renderComputers()
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          flex: "1",
                        }}
                      >
                        Não há computadores
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ width: "100%", textAlign: "center", flex: "1" }}
                    >
                      <Logo src={Loader} />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Btn onClick={() => setIsCreateModalVisible(true)}>+</Btn>
        </Bottom>

        {isPopUpVisible ? (
          <PopUp>
            <h4>{returnMsg}</h4>
          </PopUp>
        ) : null}
      </Main>
      {isCreateModalVisible ? (
        <CreateModal
          onClose={() => setIsCreateModalVisible(false)}
          getComputers={() => getComputers()}
          openPopUp={openPopUp}
        />
      ) : null}

      {isModalDeleteVisible ? (
        <ModalDelete
          onDelete={() => setIsModalDeleteVisible(false)}
          getFunc={() => getComputers()}
          id={deleteId}
          apiUrl="https://backendresilia-api.herokuapp.com/computers/"
          openPopUp={openPopUp}
        />
      ) : null}

      {isModalUpdateVisible ? (
        <ModalUpdate
          onClose={() => setIsModalUpdateVisible(false)}
          updateId={updateId}
          getComputers={() => getComputers()}
          openPopUp={openPopUp}
        />
      ) : null}
    </>
  );
}

export default ComputersPage;

const Main = styled.main`
  position: relative;
  grid-area: main;
  display: grid;
  grid-template-areas:
    "top"
    "content";
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  gap: 10px;
`;
const popUp = keyframes`
to {right: 25px;}
`;

const transformKey = keyframes`
from{transform: translateX(-10px);}
to {transform: initial;}
`;

const transitionKey = keyframes`
to {
    opacity: initial;
    transform: initial;
  }
`;
const Top = styled.div`
  width: 100%;

  h1 {
    text-align: center;
    animation: ${transformKey} 0.05s ease-in;
  }
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid #666;
  font-size: 1.12rem;

  thead {
    border-top: 1px solid #a5a5a5;
    border-bottom: 1px solid #a5a5a5;
    background-color: #000000;
    color: #fff;
    text-transform: uppercase;
  }

  tr {
    font-weight: bolder;
    background-color: white;
    opacity: 0;
    animation: ${transitionKey} 0.3s forwards;
    &:hover {
      background-color: lightgray;
    }
  }

  tr:nth-child(even) {
    background-color: gray;
    color: white;
  }

  thead tr:hover {
    background-color: transparent;
    color: inherit;
  }

  thead tr {
    opacity: 1;
    background-color: black;
  }

  th {
    padding: 10px 20px;
  }

  td {
    text-align: center;
    padding: 3px;
  }
`;

const Btn = styled.button`
  margin: 5px;
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-weight: bold;
  color: #ffd000;
  text-transform: uppercase;
  font-size: 25px;
  background-color: black;
  &:hover {
    background-color: #ffd000;
    color: black;
  }
`;

const Img = styled.img`
  width: 15px;
  margin: 5px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 30px;
  margin: 9px;
`;
const PopUp = styled.div`
  position: absolute;
  right: -300px;
  height: 45px;
  width: 300px;
  background-color: #0000008a;
  color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  animation: ${popUp} 0.3s forwards;
`;
