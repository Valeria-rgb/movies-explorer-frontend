import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isAccountMenuOpen, setIsAccountMenuOpen] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);

    const history = useHistory();

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

    function handleRegister(name, email, password) {
        mainApi.signUp(name, email, password)
            .then((data) => {
                setLoggedIn(true);
                setCurrentUser({...data});
                history.push('/movies');
            })
            .catch((err) => {
                console.log(err);
            });
    }


  return (
      <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
        <Header
            onMenuClick={handleAccountMenuClick}
        />
        <Switch>
      <Route path="/signup">
        <Register
            onRegister={handleRegister}
        />
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
      </CurrentUserContext.Provider>
  );
}

export default App;
