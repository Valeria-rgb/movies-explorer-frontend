import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import AccountMenu from '../AccountMenu/AccountMenu';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);

    React.useEffect(() => {
        moviesApi.getMovies()
            .then((movies) => {
                setMovies(movies);
            })
    }, []);

    React.useEffect(() => {
        mainApi.getSavedMovies()
            .then((movies) => {
                setSavedMovies(movies);
            })
    }, []);

    function handleAccountMenuClick() {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    }

    function closeAccountMenu() {
        setIsAccountMenuOpen(false);
    }

  return (
    <div className="app">
        <Header
            onMenuClick={handleAccountMenuClick}
        />
        <Switch>
      <Route path="/signup">
        <Register/>
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route exact path="/">
          <Main/>
      </Route>
      <Route path="/movies">
        <Movies
            movies={ movies }
        />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies
            movies={ savedMovies }
        />
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
        </Switch>
        <Footer/>
        <AccountMenu
            isOpen={isAccountMenuOpen}
            onClose={closeAccountMenu}/>
    </div>
  );
}

export default App;
