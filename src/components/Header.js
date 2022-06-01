import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #677ce2;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 24px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 20px;
`;

const Account = styled.p`
  font-weight: bold;
  color: #ffffff;
  padding-bottom: 20px;
`;

const Header = ({ account }) => {
  return (
    <Container>
      <Wrapper>
        <Title>Task Manager</Title>
        <Account>Account: {account}</Account>
      </Wrapper>
    </Container>
  );
};

export default Header;
