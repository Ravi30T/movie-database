import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, title, posterPath, rating} = movieDetails

  return (
    <li className="movie-item-container">
      <img className="movie-item-image" alt={title} src={posterPath} />
      <div className="movie-details-container">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">
          <span className="rating-heading"> Rating: </span> {rating}
        </p>
      </div>
      <Link to={`/movie/${id}`} className="view-details-btn-container">
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieItem
