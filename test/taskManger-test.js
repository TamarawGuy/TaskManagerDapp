const { expect } = require("chai");
const { ethers } = require("hardhat");
/*eslint-disable */
describe("TaskManager", function () {
  let TaskManager, taskManager;

  before(async function () {
    TaskManager = await ethers.getContractFactory("TaskManager");
    taskManager = await TaskManager.deploy();
    await taskManager.deployed();
  });

  it("should create a new task", async function () {
    await taskManager.createTask("Task 1");
    let tasks = await taskManager.getAllTasks();
    expect(tasks.length === 1);
    expect(tasks[0].name === "Task 1");
    expect(tasks[0].status === 0);
  });

  it("should update task name", async function () {
    await taskManager.createTask("Task 1");
    await taskManager.updateTaskName(0, "Updated Task 1");
    let tasks = await taskManager.getAllTasks();
    expect(tasks.length === 1);
    expect(tasks[0].name === "Updated Task 1");
    expect(tasks[0].status === 0);
  });

  it("should update task status", async function () {
    await taskManager.createTask("Task 1");
    await taskManager.updateTaskStatus(0, 1);
    let tasks = await taskManager.getAllTasks();
    expect(tasks.length === 1);
    expect(tasks[0].name === "Task 1");
    expect(tasks[0].status === 1);
  });

  it("should return all tasks", async function () {
    await taskManager.createTask("Task 1");
    await taskManager.createTask("Task 2");
    await taskManager.createTask("Task 3");
    let tasks = await taskManager.getAllTasks();
    expect(tasks.length === 3);
    expect(tasks[0].name === "Task 1");
    expect(tasks[0].status === 0);
    expect(tasks[0].name === "Task 2");
    expect(tasks[0].status === 0);
    expect(tasks[0].name === "Task 3");
    expect(tasks[0].status === 0);
  });
});
