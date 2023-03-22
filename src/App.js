import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

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
      const response = await fetch(
        "https://movies-46dd9-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong:");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movies-46dd9-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "contet-Type": "application/json",
        },
      }
    );
    const data = response.json();
    setPostSuccess(true);
  }

  // async function deletemovies(id) {
  //   const response = await fetch(
  //     "https://movies-46dd9-default-rtdb.firebaseio.com/movies.json",
  //     {
  //       method: "DELETE",
  //       body: JSON.stringify(id),
  //       headers: {
  //         "contet-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = response.json();
  //   function deletemovies(Id) {
  //     const filterItem = data.filter((item)=> item.id!==Id )
  //     setMovies(filterItem)

  //   console.log(data);
  // }

  //  }

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
  }, []);

  useEffect(() => {
    if (postSuccess) {
      getMovies();
      setPostSuccess(false);
    }
  }, [postSuccess]);

  useEffect(() => {
    if (deletePost) {
      getMovies();
      setDeletePost(false);
    }
  }, [deletePost]);

  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler} />
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && (
          <MoviesList movies={movies} setDeletePost={setDeletePost} />
        )}
        {!loading && movies.length === 0 && !error && <p>found No movies</p>}
        {loading && <p>....Loading</p>}

        {!loading && error && <p>{error}</p>}
        {/* {content} */}
      </section>
    </React.Fragment>
  );
}

export default App;
