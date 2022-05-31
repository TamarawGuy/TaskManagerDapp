//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        uint8 status; //0 -> Not done, 1 -> In progress, 2 -> Done
        uint8 readyForUpdate; //0 -> Not ready, 1 -> Ready
        string name;
    }

    Task[] public tasks;

    function getAllTasks() external view returns (Task[] memory) {
        return tasks;
    }

    function createTask(string memory _name) external {
        tasks.push(Task(0, 0, _name));
    }

    function updateTaskName(uint256 _index, string memory _name) external {
        tasks[_index].name = _name;
    }

    function updateTaskStatus(uint256 _index, uint8 status) external {
        tasks[_index].status = status;
    }

    function updateTaskReady(uint256 _index, uint8 _readyForUpdate) external {
        tasks[_index].readyForUpdate = _readyForUpdate;
    }
}
