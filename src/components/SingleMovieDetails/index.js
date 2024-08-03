import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITAIL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SingleMovieDetails = props => {
  const [movieDetails, setMovieDetails] = useState([])
  const [movieCastDetails, setMovieCastDetails] = useState([])
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial)
  const [castApiStatus, updateCastApiStatus] = useState(
    apiStatusConstants.initial,
  )

  const {match} = props
  const {params} = match
  const {id} = params

  const MOVIE_ID = id

  useEffect(() => {
    const getMovieDetails = async () => {
      updateApiStatus(apiStatusConstants.inProgress)

      const API_KEY = '37fbfaac19d3128f0de7a2f98f318c0a'
      const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok === true) {
        const updatedData = {
          id: data.id,
          movieName: data.original_title,
          movieImg: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
          ratings: data.vote_average,
          releaseDate: data.release_date,
          genres: data.genres,
          duration: data.runtime,
          overView: data.overview,
        }

        setMovieDetails(updatedData)
        updateApiStatus(apiStatusConstants.success)
      } else {
        updateApiStatus(apiStatusConstants.failure)
      }
    }

    getMovieDetails()
  }, [])

  useEffect(() => {
    const getMovieCastDetails = async () => {
      updateCastApiStatus(apiStatusConstants.inProgress)
      const API_KEY = '37fbfaac19d3128f0de7a2f98f318c0a'

      const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`

      const response = await fetch(url)
      const data = await response.json()

      console.log(
        data.cast.map(each => ({
          name: each.original_name,
        })),
      )

      if (response.ok === true) {
        const updatedData = data.cast.map(each => ({
          originalName: each.original_name,
          characterName: each.character,
          profileImg: `https://image.tmdb.org/t/p/w500/${each.profile_path}`,
          id: each.id,
        }))

        setMovieCastDetails(updatedData)
        updateCastApiStatus(apiStatusConstants.success)
      } else {
        updateCastApiStatus(apiStatusConstants.failure)
      }
    }

    getMovieCastDetails()
  }, [])

  const hours = Math.floor(movieDetails.duration / 60)
  const remainingMinutes = movieDetails.duration % 60
  const actualRuntime = `${hours}h ${remainingMinutes}m`

  return (
    <div>
      <NavBar />
      <div className="main-container">
        {apiStatus === apiStatusConstants.inProgress && (
          <div className="loader-container">
            <Loader type="TailSpin" color="#032541" />
          </div>
        )}

        <div className="movie-cast-details-container">
          <>
            {apiStatus === apiStatusConstants.success && (
              <div className="each-movie-details-container">
                <div className="movie-img-container">
                  <img
                    src={movieDetails.movieImg}
                    className="movie-img"
                    alt={movieDetails.movieName}
                  />
                </div>

                <div className="movie-details-main-container">
                  <h1 className="movie-name"> {movieDetails.movieName} </h1>

                  <p className="movie-detail">
                    {' '}
                    <span className="detail-heading"> Duration: </span>{' '}
                    {actualRuntime}{' '}
                  </p>
                  <p className="movie-detail">
                    {' '}
                    <span className="detail-heading"> Release Date: </span>{' '}
                    {movieDetails.releaseDate}{' '}
                  </p>
                  <p className="movie-detail">
                    {' '}
                    <span className="detail-heading"> Ratings: </span>
                    {movieDetails.ratings}{' '}
                  </p>
                  <p className="movie-detail">
                    {' '}
                    <span className="detail-heading"> Overview: </span>
                    {movieDetails.overView}{' '}
                  </p>
                  <ul className="movie-genres-container">
                    <p className="genre-heading"> Genres: </p>

                    {movieDetails.genres.map(each => (
                      <li id={each.id} className="genre-name">
                        {each.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="movie-cast-details-container">
              <h1 className="cast-details-heading"> Cast Details </h1>

              {castApiStatus === apiStatusConstants.success && (
                <div className="movie-cast-details-main-container">
                  <ul className="movie-cast-details-list-container">
                    {movieCastDetails.map(each => (
                      <li id={each.id} className="movie-cast-details-list">
                        <>
                          <div className="profile-img-container">
                            <img
                              src={each.profileImg}
                              alt={each.originalName}
                              className="profile-img"
                            />
                          </div>
                          <p className="name">
                            {' '}
                            <span className="name-heading">
                              {' '}
                              Original Name:{' '}
                            </span>{' '}
                            {each.originalName}{' '}
                          </p>
                          <p className="name">
                            {' '}
                            <span className="name-heading">
                              {' '}
                              Character Name:{' '}
                            </span>{' '}
                            {each.characterName}{' '}
                          </p>{' '}
                        </>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default SingleMovieDetails
