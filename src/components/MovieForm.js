import React, { useRef } from "react";

import "./MovieForm.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
    // props.deletemovies()
  }



  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className="control">
          <label htmlFor="opening-text">Opening Text</label>
          <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
        </div>
        <div className="control">
          <label htmlFor="date">Release Date</label>
          <input type="text" id="date" ref={releaseDateRef} />
        </div>
        <button>Add Movie</button>
        
      </form>
      <div className="control">
       
      </div>
    </>
  );
}

export default AddMovie;
