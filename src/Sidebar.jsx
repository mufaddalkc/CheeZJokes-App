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

  /* Hide sidebar on mobile devices */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navbar = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #8e44ad;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden; /* Prevent overflow */
  flex-wrap: wrap; /* Wrap content to next line */

  /* Show navbar on mobile devices and hide on desktop devices */
  @media (max-width: 768px) {
    display: flex;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;

  /* Hide title on mobile devices */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: 6rem;
  margin: 20px 0;

  /* Hide emoji on mobile devices */
  @media (max-width: 768px) {
    display: none;
  }
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

  /* Style buttons for navbar */
  @media (max-width: 768px) {
    margin-top: 0;
    margin-right: 10px;
    padding: 5px 10px; /* Reduce padding on mobile devices */
    font-size: 1rem; /* Reduce font size on mobile devices */
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Sidebar = ({ fetchJokes, infiniteMode, toggleMode }) => {
  return (
    <>
      <Navbar>
        {infiniteMode ? (
          <Button onClick={toggleMode}>Switch to Button Mode</Button>
        ) : (
          <>
            <Button onClick={fetchJokes}>New Jokes</Button>
            <Button onClick={toggleMode}>Switch to Infinite Scroll</Button>
          </>
        )}
      </Navbar>
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
    </>
  );
};

export default Sidebar;
