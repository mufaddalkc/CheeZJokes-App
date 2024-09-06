import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import JokesList from "./JokesList";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e3f2fd;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreJokes, setHasMoreJokes] = useState(true);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://icanhazdadjoke.com/search", {
        headers: { Accept: "application/json" },
        params: {
          limit: 20,
          page: page,
        },
      });

      const newJokes = response.data.results.map((joke) => ({
        ...joke,
        score: 0,
      }));

      setJokes((prevJokes) => [...prevJokes, ...newJokes]);

      if (response.data.results.length < 10) {
        setHasMoreJokes(false);
      } else {
        setPage(page + 1);
      }
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
      <Sidebar />
      <ScrollContainer>
        <InfiniteScroll
          dataLength={jokes.length}
          next={fetchJokes}
          hasMore={hasMoreJokes}
          loader={<h4>Loading...</h4>}
        >
          <JokesList jokes={jokes} onVote={handleVote} />
        </InfiniteScroll>
      </ScrollContainer>
    </AppContainer>
  );
};

export default App;
