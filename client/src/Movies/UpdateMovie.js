import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

function UpdateMovie(props) {
  const [movie, setMovie] = useState({
    id: "",
    title: '',
    director: '',
    metascore: "",
    stars: [],
  })
  const params = useParams();
  let history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const updateAMovie = (e) => {
    e.preventDefault()
    const id = params.id
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        props.setMovieList(props.movieList.map(movie => {
          if(movie.id === res.data.id) {
            return res.data
          } else {
            return movie
          }
        }))
        setMovie({
          id: "",
          title: '',
          director: '',
          metascore: "",
          stars: [],
        })
      })
      .then(res => {
        history.push(`/movies/${id}`)
      })
      .catch((err) => console.log(err.response));
  };

  const onChange = (e) => {
    const { name, value } = e.target
    setMovie({
      ...movie,
      [name]: value
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  return (
    <div>
      <form onSubmit={e => updateAMovie(e)}>
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
        <button>Submit Changes</button>
      </form>
    </div>
  )
}

export default UpdateMovie