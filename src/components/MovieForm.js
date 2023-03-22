import React, { useState } from "react";
import "./MovieForm.css";

const MovieForm = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const addmovies = (e) => {
    e.preventDefault();
    const newObj = {
      title: title,
      text: text,
      date: date,
    };

    console.log(newObj, "uuuuuu");
  };

  return (
    <div>
      <form onSubmit={addmovies}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br></br>
        <label>opening text</label>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <br></br>
        <label>Release date</label>
        <input
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default MovieForm;
