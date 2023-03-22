import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const getMovies = () => {
  //   fetch('https://swapi.dev/api/films/').then((response)=>{
  //     return response.json();
  //   }).then((data)=>{
  //     const trasformedmovies = data.results.map((item)=>{
  //       return {
  //         id:item.episode_id,
  //         title:item.title,
  //         text:item.opening_text
  //       }
  //     })
  //     setMovies(trasformedmovies)
  //   })
  // }

  const getMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong:");
      }
      const data = await response.json();

      const trasformedmovies = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          text: item.opening_crawl,
        };
      });
      setMovies(trasformedmovies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  // let content = <p>found no movies</p>;

  // if (movies.length > 0) {
  //   content = <MoviesList movies={movies} />;
  // }
  // if (error) {
  //   content = <p>{error}</p>;
  // }
  // if (loading) {
  //   content = <p>Loading...</p>;
  // }

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <React.Fragment>
    <MovieForm/>
      <section>
      
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && !error && <p>found No movies</p>}
        {loading && <p>....Loading</p>}

        {!loading && error && <p>{error}</p>}
        {/* {content} */}
      </section>
    </React.Fragment>
  );
}

export default App;
