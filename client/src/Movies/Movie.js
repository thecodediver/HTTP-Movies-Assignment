import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  let history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteMovie = () => {
    const id = params.id
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data)
        props.setMovieList(props.movieList.filter(movie => {
          return movie.id !== id
        }))
      })
      .then(res => {
        history.push('/')
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <Link to={`/update-movie/${movie.id}`}>Update Movie</Link>
      <button onClick={e => deleteMovie(e)}>Delete Movie</button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
