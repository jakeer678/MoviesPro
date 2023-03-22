import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {

  
async function deleteuser(movie) {
  const response = await fetch(
    "https://movies-46dd9-default-rtdb.firebaseio.com/movies.json",
    {
      method: "DELETE",
      body: JSON.stringify(movie),
      headers: {
        "contet-Type": "application/json",
      },
    }
  );
  const data = response.json();
  props.setDeletePost(true)
  console.log(data);
}

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={()=>deleteuser(props.id)}>delete movie</button>
    </li>
  );
};

export default Movie;
