import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";
import Task from "./components/Task";
import TaskList from "./components/TaskList";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);

  const mockTasks = [
    {
      status: 0,
      name: "Task 1",
    },
    {
      status: 0,
      name: "Task 2",
    },
    {
      status: 0,
      name: "Task 3",
    },
  ];

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          TaskManager.abi,
          signer
        )
      );
    } else {
      console.log(`Please install metamask`);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskList tasks={mockTasks} />
    </div>
  );
};

export default App;
