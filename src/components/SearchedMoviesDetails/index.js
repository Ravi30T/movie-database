import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITAIL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SearchedMoviesDetails = () => {
  const [searchedMoviesData, updateSearchedMoviesData] = useState([])
  const [searchVal, updateSearchVal] = useState('')
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial)
  const [currentPage, setCurrentPage] = useState(1)

  const getSearchMovies = async () => {
    const API_KEY = '37fbfaac19d3128f0de7a2f98f318c0a'
    const MOVIE_NAME = searchVal
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=${currentPage}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        totalResults: data.total_results,
        totalPages: data.total_pages,
        results: data.results.map(eachRes => ({
          posterPath: `https://image.tmdb.org/t/p/w500/${eachRes.poster_path}`,
          id: eachRes.id,
          title: eachRes.title,
          rating: eachRes.vote_average,
        })),
      }

      updateSearchedMoviesData(updatedData)
      updateApiStatus(apiStatusConstants.success)
    } else {
      updateApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getSearchMovies(searchVal)
  }, [searchVal])

  const handleSearchInput = val => {
    updateSearchVal(val)
  }

  return (
    <>
      <NavBar getSearchMovieName={handleSearchInput} />
      {searchVal === '' ? (
        <div className="search-main-container">
          <h1 className="empty-search"> Search Results </h1>
        </div>
      ) : (
        <div className="main-container">
          {apiStatus === apiStatusConstants.inProgress && (
            <div className="loader-container">
              <Loader type="TailSpin" color="#032541" />
            </div>
          )}
          {apiStatus === apiStatusConstants.success && (
            <div className="movie-list-main-container">
              <ul className="movies-list-container">
                {searchedMoviesData.results.map(movie => (
                  <MovieItem key={movie.id} movieDetails={movie} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SearchedMoviesDetails
