import { useState } from "react";
import Task from "./Task";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background: #eee;
  margin: 20px;
  border-radius: 12px;
  -webkit-box-shadow: 1px 1px 15px 1px #000000;
  box-shadow: 1px 1px 15px 1px #000000;
`;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.p`
  font-size: 20px;
  text-transform: uppercase;
  color: #333;
  text-align: center;
  margin-top: 15px;
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const Li = styled.li`
  list-style: none;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background-color: #677ce2;
  color: #ffffff;
  cursor: pointer;
`;

const TaskDone = ({
  tasks,
  updateTaskStatus,
  updateTaskName,
  updateTaskReady,
}) => {
  const [text, setText] = useState("");

  const updateNameAndReady = (index, ready, name) => {
    updateTaskReady(index, ready);
    updateTaskName(index, name);
  };

  return (
    <Container>
      <Title>Done Tasks</Title>
      <Wrapper>
        <Ul>
          {tasks
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 2)
            .map((task) => (
              <Li key={task.id}>
                <Task
                  status={task.item.status}
                  ready={task.item.readyForUpdate}
                  name={task.item.name}
                />
                <ButtonWrapper>
                  <Button onClick={() => updateTaskStatus(task.id, 0)}>
                    Not Done
                  </Button>
                  <Button onClick={() => updateTaskStatus(task.id, 1)}>
                    In Progress
                  </Button>
                  <Button
                    style={{
                      display: task.item.readyForUpdate === 0 ? "" : "none",
                    }}
                    onClick={() => updateTaskReady(task.id, 1)}
                  >
                    Rename
                  </Button>
                  <Button
                    style={{
                      display: task.item.readyForUpdate === 0 ? "none" : "",
                    }}
                    onClick={() => updateNameAndReady(task.id, 0, text)}
                  >
                    Update
                  </Button>
                  <input
                    style={{
                      display: task.item.readyForUpdate === 0 ? "none" : "",
                    }}
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                  />
                </ButtonWrapper>
              </Li>
            ))}
        </Ul>
      </Wrapper>
    </Container>
  );
};

export default TaskDone;
