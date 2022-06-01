import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";

import TaskNotDone from "./components/TaskNotDone";
import TaskForm from "./components/TaskForm";
import TaskInProgress from "./components/TasksInProgress";
import TaskDone from "./components/TaskDone";
import Header from "./components/Header";

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
        process.env.REACT_APP_CONTRACT_ADDRESS,
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
        process.env.REACT_APP_CONTRACT_ADDRESS,
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
        process.env.REACT_APP_CONTRACT_ADDRESS,
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
        process.env.REACT_APP_CONTRACT_ADDRESS,
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
        process.env.REACT_APP_CONTRACT_ADDRESS,
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
    <div>
      <Header account={account} />
      <TaskForm createTask={createTask} />
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
    </div>
  );
};

export default App;
