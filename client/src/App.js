import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovies from "./Movies/UpdateMovie"
import AddMovie from "./Movies/AddMovie"
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route path="/add-movie">
        <AddMovie setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/movies/:id">
        <Movie setMovieList={setMovieList} movieList={movieList} addToSavedList={addToSavedList} />
      </Route>
      <Route path="/update-movie/:id">
        <UpdateMovies setMovieList={setMovieList} movieList={movieList}/>
      </Route>
    </>
  );
};

export default App;
