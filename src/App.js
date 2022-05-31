import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

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
      let task = await contract.createTask(name);
      await task.wait();
      let tasks = await contract.getAllTasks();
      setTasks(tasks);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm createTask={createTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
