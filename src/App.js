import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";
import Task from "./components/Task";

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
      <Task status={mockTasks[0].status} name={mockTasks[0].name} />
      <Task status={mockTasks[1].status} name={mockTasks[1].name} />
      <Task status={mockTasks[2].status} name={mockTasks[2].name} />
    </div>
  );
};

export default App;
