import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    connect();
  }, []);

  return <div>{account}</div>;
};

export default App;
