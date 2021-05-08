import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundWindow from '../NotFoundWindow/NotFoundWindow';
import AccountMenu from '../AccountMenu/AccountMenu';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({})
    const [isAccountMenuOpen, setIsAccountMenuOpen] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [sortedMovies, setSortedMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [savedSortedMovies, setSavedSortedMovies] = React.useState([]);
    const [query, setQuery] = React.useState('');

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

    function tokenCheck() {
        const token = localStorage.getItem('jwt');
        if (token) {
            setLoggedIn(true);
            mainApi.getToken()
                .then((userData) => {
                    if (userData) {
                        console.log(userData)
                        setCurrentUser(userData);
                        setLoggedIn(true);
                        history.push('/movies');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }}

    function handleRegister(name, email, password) {
        mainApi.signUp(name, email, password)
            .then((data) => {
                setLoggedIn(true);
                setCurrentUser({...data});
                history.push('/signin');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogIn(email, password) {
        mainApi.signIn(email, password)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    tokenCheck()
                    history.push('/movies');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateProfile(data) {
        mainApi.changeUserInfo(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data});
                history.push("/movies");
            })
            .catch((err) => console.log(`Упс!: ${err}`));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Header
                    onMenuClick={handleAccountMenuClick}
                    loggedIn={loggedIn}/>
                <Switch>
                    {!loggedIn &&
                    <Route path="/signup">
                        <Register
                            onRegister={handleRegister}/>
                    </Route>}
                    {!loggedIn &&
                    <Route path="/signin">
                        <Login
                            onLogin={handleLogIn}/>
                    </Route>}
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        component={Movies}
                        movies={ sortedMovies }/>
                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                        movies={ savedSortedMovies }/>
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        onEditProfile={handleUpdateProfile}/>
                    <Route path="/*">
                        <NotFoundWindow/>
                    </Route>
                </Switch>
                {loggedIn && <Footer/>}
                {loggedIn &&
                <AccountMenu
                    isOpen={isAccountMenuOpen}
                    onClose={closeAccountMenu}/>}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
