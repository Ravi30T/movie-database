import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import SearchedMoviesDetails from './components/SearchedMoviesDetails'
import SingleMovieDetails from './components/SingleMovieDetails'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={UpcomingMovies} />
    <Route exact path="/movie/:id" component={SingleMovieDetails} />
    <Route exact path="/search" component={SearchedMoviesDetails} />
  </Switch>
)

export default App
