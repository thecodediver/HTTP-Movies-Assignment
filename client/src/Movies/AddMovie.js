import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function AddMovie(props) {

  const [movie, setMovie] = useState({ title: "", director: "", metascore: "", stars: ""})
  let history = useHistory()

  const onChange = (e) => {
    const { name, value } = e.target
    setMovie({
      ...movie,
      [name]: value
    })
  }

  const addMovie = (e) => {
    e.preventDefault()
    const sendMovie = {...movie}
    sendMovie.stars = movie.stars.split(",")
    axios
      .post(`http://localhost:5000/api/movies`, sendMovie)
      .then((res) => {
        props.setMovieList(res.data)
        setMovie({
          title: '',
          director: '',
          metascore: "",
          stars: [],
        })
        history.push(`/`)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Add A Movie</h1>
      <form onSubmit={addMovie}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={movie.title} onChange={e => onChange(e)} />
        </div>
        <div>
          <label htmlFor="director">Director</label>
          <input type="text" name="director" id="director" value={movie.director} onChange={e => onChange(e)} />
        </div>
        <div>
          <label htmlFor="metascore">Metascore</label>
          <input type="text" name="metascore" id="metascore" value={movie.metascore} onChange={e => onChange(e)} />
        </div>
        <div>
          <label htmlFor="stars">Stars (seperate each start with a comma)</label>
          <input type="text" name="stars" id="stars" value={movie.stars} onChange={e => onChange(e)} />
        </div>
        <button>Submit Changes</button>
      </form>
    </div>
    
  )
}

export default AddMovie