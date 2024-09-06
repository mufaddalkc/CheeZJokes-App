import React from "react";
import styled from "styled-components";

const JokeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const JokeText = styled.p`
  flex: 1;
  margin: 0 10px;
  color: black; /* Set the joke text color to black */
`;

const VoteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props) => (props.up ? "green" : "red")};
`;

const Score = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Emoji = styled.span`
  font-size: 2rem;
  margin-left: 10px;
`;

const Joke = ({ joke, onVote }) => {
  const getEmoji = (score) => {
    if (score >= 15) return "🤣";
    if (score >= 10) return "😂";
    if (score >= 5) return "😊";
    if (score >= 0) return "😐";
    return "🙁";
  };

  return (
    <JokeContainer>
      <VoteButton up onClick={() => onVote(joke.id, 1)}>
        ⬆️
      </VoteButton>
      <Score>{joke.score}</Score>
      <VoteButton onClick={() => onVote(joke.id, -1)}>⬇️</VoteButton>
      <JokeText>{joke.joke}</JokeText> {}
      <Emoji>{getEmoji(joke.score)}</Emoji>
    </JokeContainer>
  );
};

export default Joke;
