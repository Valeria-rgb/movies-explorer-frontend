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
import auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({})
    const [isAccountMenuOpen, setIsAccountMenuOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isNoResult, setIsNoResult] = React.useState(false);
    const [isBtnHidden, setIsBtnHidden] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [sortedMovies, setSortedMovies] = React.useState([]);
    const [userSavedMovies, setUserSavedMovies] = React.useState(false);
    const [shortMovie, setShortMovie] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getToken(jwt)
                .then((data) => {
                    setLoggedIn(true);
                    history.push('/movies');
                })
                .catch((err) => console.log(`Упс!: ${err}`))
        }
    }, [history]);

    React.useEffect(() => {
        moviesApi.getMovies()
            .then((movies) => {
                localStorage.setItem('movies', movies);
                setMovies(movies);
                setIsBtnHidden(true);
            })
            .catch((err) => {
                console.log(`Ошибка при загрузке фильмов: ${err.message}`)
            });
    }, []);

    React.useEffect(() => {
        mainApi.getSavedMovies()
            .then((movies) => {
                setUserSavedMovies(movies);
            })
    }, []);


    function handleAccountMenuClick() {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    }

    function closeAccountMenu() {
        setIsAccountMenuOpen(false);
    }

    function tokenCheck() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            setLoggedIn(true);
            auth.getToken(jwt)
                .then((data) => {
                    if (data) {
                        setCurrentUser(data)
                        setLoggedIn(true);
                        // history.push('/movies');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }}

    function handleRegister(name, email, password) {
        auth.signUp(name, email, password)
            .then((data) => {
                if (data) {
                    setCurrentUser({...currentUser, ...data})
                    history.push('/signin');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogIn(email, password) {
        auth.signIn(email, password)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    tokenCheck();
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

    function showPreloader() {
        setIsLoading(true);
        setTimeout(async () => {
            setIsLoading(false);
        }, 600);
    }

    function handleCheckBox() {
        setShortMovie(!shortMovie);
    }

    function filterShortMovies(sortedMovies) {
        if (sortedMovies.length !== 0 || sortedMovies !== 'undefined') {
            return sortedMovies.filter((movie) =>
                shortMovie ? movie.duration <= 40: true
            )
        }
    }

    function searchMovies (keyword) {
        showPreloader();
        const keywordLowerCase = keyword.toLowerCase();
        const result = [];
        movies.forEach((item) => {
            if ((item.nameRU !== null && item.nameRU.toLowerCase().includes(keywordLowerCase))
                ||
                (item.nameEN !== null &&
                    item.nameEN.toLowerCase().includes(keywordLowerCase))) {
                result.push(item);
                setIsNoResult(false);
                setIsBtnHidden(false)
                setSortedMovies(result);
                localStorage.setItem('keywordOfSearch', JSON.stringify(keyword));
                localStorage.setItem('searchMoviesResult', JSON.stringify(result));
            }
            else if (result.length < 1) {
                setIsNoResult(true);
                setSortedMovies([]);
            }
        })
    }

    function searchSavedMovies(keyword) {
        showPreloader();
        const keywordLowerCase = keyword.toLowerCase();
        const result = [];
        userSavedMovies.forEach((item) => {
            if ((item.nameRU !== null && item.nameRU.toLowerCase().includes(keywordLowerCase))
                ||
                (item.nameEN !== null &&
                    item.nameEN.toLowerCase().includes(keywordLowerCase))) {
                result.push(item);
                setIsNoResult(false);
                setIsBtnHidden(false)
                setUserSavedMovies(result);
                localStorage.setItem('keywordOfSearchInSaved', JSON.stringify(keyword));
                localStorage.setItem('searchInSavedMoviesResult', JSON.stringify(result));
            }
            else if (result.length < 1) {
                setIsNoResult(true);
                setUserSavedMovies([]);
            }
        })
    }

    function saveMovie(movie) {
            mainApi.saveMovie(movie)
                .then((newSavedMovie) => {
                    setUserSavedMovies([...userSavedMovies, newSavedMovie]);
                    setIsSaved(true);
                })
                .catch(err => console.log(`Ошибка: ${err.message}`))
    }

    function deleteMovie (movie) {
        const movieId = movie.id || movie.movieId;
        const selectedMovie = userSavedMovies.find((item) => item.movieId === movieId);
        mainApi.deleteMovie({_id: selectedMovie._id})
            .then((deletedMovie) => {
                if (!deletedMovie) {
                    throw new Error("При удалении фильма произошла ошибка");
                } else {
                    const newMoviesList = userSavedMovies.filter((c) => c.movieId !== movieId);
                    setUserSavedMovies(newMoviesList);
                }
            })
            .catch((err) => console.log(`При удалении фильма: ${err}`));
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                {loggedIn && <Header
                    onMenuClick={handleAccountMenuClick}
                    loggedIn={loggedIn}/>}
                <Switch>
                    <Route path="/signup">
                        <Register
                            onRegister={handleRegister}/>
                    </Route>
                    <Route path="/signin">
                        <Login
                            onLogin={handleLogIn}/>
                    </Route>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        component={Movies}
                        movies={ filterShortMovies(sortedMovies) }
                        onSearch={searchMovies}
                        onFilter={handleCheckBox}
                        isShortMovie={shortMovie}
                        onSave={saveMovie}
                        onDelete={deleteMovie}
                        isNoResult={isNoResult}
                        isBtnHidden={isBtnHidden}
                        isSaved={isSaved}
                    />
                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                        onSearch={searchSavedMovies}
                        isNoResult={isNoResult}
                        isLoading={isLoading}
                        movies={userSavedMovies}
                        onDelete={deleteMovie}
                    />
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        onEditProfile={handleUpdateProfile}/>
                    {loggedIn &&
                    <Route path="/*">
                         <NotFoundWindow/>
                    </Route>}
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
