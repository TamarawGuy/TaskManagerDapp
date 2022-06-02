import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";

import TaskNotDone from "./components/TaskNotDone";
import TaskForm from "./components/TaskForm";
import TaskInProgress from "./components/TasksInProgress";
import TaskDone from "./components/TaskDone";
import Header from "./components/Header";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: rgb(2, 30, 100);
  background: linear-gradient(
    180deg,
    rgba(2, 30, 100, 1) 0%,
    rgba(44, 110, 240, 0.7680205871411064) 55%,
    rgba(0, 142, 255, 1) 100%
  );
`;

const TaskContainer = styled.div`
  display: flex;
`;

const App = () => {
  const abi = TaskManager.abi;
  const [account, setAccount] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const init = async () => {
      connect();
      getAllTasks();
    };

    init();
  }, []); //eslint-disable-line

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      console.log(`Please install metamask`);
    }
  };

  const getAllTasks = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x1383Df4d27c4E539EB4ceb6df256EFec883CEFd9",
        abi,
        signer
      );
      let result = await contract.getAllTasks();
      setTasks(result);
    }
  };

  const createTask = async (name) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x1383Df4d27c4E539EB4ceb6df256EFec883CEFd9",
        abi,
        signer
      );
      const task = await contract.createTask(name);
      await task.wait();
      const newTasks = await contract.getAllTasks();
      setTasks(newTasks);
    }
  };

  const updateTaskStatus = async (index, status) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x1383Df4d27c4E539EB4ceb6df256EFec883CEFd9",
        abi,
        signer
      );
      const newTask = await contract.updateTaskStatus(index, status);
      await newTask.wait();
      const newTasks = await contract.getAllTasks();
      setTasks(newTasks);
    }
  };

  const updateTaskName = async (index, name) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x1383Df4d27c4E539EB4ceb6df256EFec883CEFd9",
        abi,
        signer
      );
      const newTask = await contract.updateTaskName(index, name);
      await newTask.wait();
      const newTasks = await contract.getAllTasks();
      setTasks(newTasks);
    }
  };

  const updateTaskReady = async (index, ready) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x1383Df4d27c4E539EB4ceb6df256EFec883CEFd9",
        abi,
        signer
      );
      const newTask = await contract.updateTaskReady(index, ready);
      await newTask.wait();
      const newTasks = await contract.getAllTasks();
      setTasks(newTasks);
    }
  };

  return (
    <Container>
      <Header account={account} />
      <TaskForm createTask={createTask} />
      <TaskContainer>
        <TaskNotDone
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          updateTaskName={updateTaskName}
          updateTaskReady={updateTaskReady}
        />
        <TaskInProgress
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          updateTaskName={updateTaskName}
          updateTaskReady={updateTaskReady}
        />
        <TaskDone
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          updateTaskName={updateTaskName}
          updateTaskReady={updateTaskReady}
        />
      </TaskContainer>
    </Container>
  );
};

export default App;
