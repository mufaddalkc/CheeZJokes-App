import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 30%;
  background-color: #8e44ad;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Emoji = styled.div`
  font-size: 6rem;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #ecf0f1;
  color: #8e44ad;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Sidebar = ({ fetchJokes, infiniteMode, toggleMode }) => {
  return (
    <SidebarContainer>
      <Title>Dad Jokes</Title>
      <Emoji>😂</Emoji>
      {infiniteMode ? (
        <Button onClick={toggleMode}>Switch to Button Mode</Button>
      ) : (
        <>
          <Button onClick={fetchJokes}>New Jokes</Button>
          <Button onClick={toggleMode}>Switch to Infinite Scroll</Button>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
