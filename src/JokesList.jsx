import Joke from "./Joke";
import styled from "styled-components";

const JokesListContainer = styled.div`
  width: 70%;
  padding: 20px;
  overflow-y: auto;
`;

const JokesList = ({ jokes, onVote }) => {
  return (
    <JokesListContainer>
      {jokes.map((joke, index) => (
        <Joke key={`${joke.id} - ${index}`} joke={joke} onVote={onVote} />
      ))}
    </JokesListContainer>
  );
};

export default JokesList;
