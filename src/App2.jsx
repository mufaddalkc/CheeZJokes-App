import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import JokesList from "./JokesList";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e3f2fd;
`;

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log("come");

    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://icanhazdadjoke.com/search", {
        headers: { Accept: "application/json" },
        params: {
          limit: 20,
          page: Math.floor(offset / 10) + 1,
        },
      });

      const newJokes = response.data.results.map((joke) => ({
        ...joke,
        score: 0,
      }));

      setJokes(newJokes);
      setOffset((prevOffset) => prevOffset + 10);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (id, delta) => {
    setJokes((prevJokes) =>
      prevJokes.map((joke) =>
        joke.id === id ? { ...joke, score: joke.score + delta } : joke
      )
    );
  };

  return (
    <AppContainer>
      <Sidebar fetchJokes={fetchJokes} /> {}
      {loading ? (
        <p>Loading jokes...</p>
      ) : (
        <JokesList jokes={jokes} onVote={handleVote} />
      )}
    </AppContainer>
  );
};

export default App;
