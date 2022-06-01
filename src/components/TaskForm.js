import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background-color: #677ce2;
  color: #ffffff;
  cursor: pointer;
`;

const TaskForm = ({ createTask }) => {
  const [text, setText] = useState("");
  return (
    <Container>
      <Wrapper>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setText("");
            createTask(text);
          }}
        >
          <Input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setText(e.target.value)}
          />
          <Button>Add new Task</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default TaskForm;
