import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const NavBar = props => {
  const [searchVal, updateSearchVal] = useState('')

  const onEnterSearchVal = event => {
    updateSearchVal(event.target.value)
  }

  const onClickEnterKey = event => {
    const {getSearchMovieName} = props
    if (event.key === 'Enter' && searchVal !== '') {
      getSearchMovieName(searchVal)
    }
  }

  const onClickSearchBoxIcon = () => {
    const {getSearchMovieName} = props
    if (searchVal !== '') {
      getSearchMovieName(searchVal)
    }
  }

  const renderSearchBar = () => {
    const {history} = props

    const path = history.location.pathname
    if (path === '/search') {
      return (
        <div className="search-box-container">
          <input
            type="search"
            className="search-box"
            onChange={onEnterSearchVal}
            onKeyDown={onClickEnterKey}
            placeholder="Search"
          />
          <div className="search-icon-container">
            <button
              type="button"
              className="search-box-icon"
              onClick={onClickSearchBoxIcon}
            >
              <HiOutlineSearch />
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Link to="/search" className="search-bar-link-item">
          <button type="button" className="empty-search-icon">
            <HiOutlineSearch />
          </button>
        </Link>
      </div>
    )
  }

  const {history} = props

  const path = history.location.pathname

  const popularActive = path === '/' && 'popular-active'
  const topRatedActive = path === '/top-rated' && 'top-rated-active'
  const upcomingActive = path === '/upcoming' && 'upcoming-active'

  return (
    <nav className="navbar-container">
      <div className="website-logo-container">
        <Link className="nav-link" to="/">
          <h1 className="website-logo">movieDB</h1>
        </Link>
      </div>
      <div className="nav-items-search-icon-container">
        <ul className="nav-items-list-container">
          <li className={`nav-item ${popularActive}`}>
            <Link className="nav-link" to="/">
              <h1 className="nav-option"> Popular </h1>
            </Link>
          </li>
          <li className={`nav-item ${topRatedActive}`}>
            <Link className="nav-link" to="/top-rated">
              <h1 className="nav-option"> Top Rated </h1>
            </Link>
          </li>
          <li className={`nav-item ${upcomingActive}`}>
            <Link className="nav-link" to="/upcoming">
              <h1 className="nav-option"> Upcoming </h1>
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
