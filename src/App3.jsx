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
  padding: 20px;
  overflow-y: hidden;
`;

const JokesListContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const InfiniteScrollWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreJokes, setHasMoreJokes] = useState(true);
  const [infiniteMode, setInfiniteMode] = useState(true);

  useEffect(() => {
    if (infiniteMode) {
      fetchJokesInfinite();
    } else {
      fetchJokesButton();
    }
  }, [infiniteMode]);

  const fetchJokesInfinite = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

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
      setLoadingMore(false);
    }
  };

  const fetchJokesButton = async () => {
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

      setJokes(newJokes);
      setPage(page + 1);
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

  const toggleMode = () => {
    setInfiniteMode(!infiniteMode);
  };

  return (
    <AppContainer>
      <Sidebar
        fetchJokes={fetchJokesButton}
        infiniteMode={infiniteMode}
        toggleMode={toggleMode}
      />
      {infiniteMode ? (
        <ScrollContainer>
          <InfiniteScrollWrapper id="scroll-container">
            <InfiniteScroll
              dataLength={jokes.length}
              next={() => {
                if (!loadingMore) {
                  fetchJokesInfinite();
                }
              }}
              hasMore={hasMoreJokes}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scroll-container"
            >
              <JokesList jokes={jokes} onVote={handleVote} />
            </InfiniteScroll>
          </InfiniteScrollWrapper>
        </ScrollContainer>
      ) : (
        <JokesListContainer>
          <JokesList jokes={jokes} onVote={handleVote} />
        </JokesListContainer>
      )}
    </AppContainer>
  );
};

export default App;
