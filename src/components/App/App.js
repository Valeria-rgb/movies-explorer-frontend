import React from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
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
import {shortMovieDuration, conflictErrorText, unauthorizedErrorText, serverErrorText, uncorrectTokenText, badRequestErrorText} from '../../utils/constants';

function App() {
    const location = useLocation();
    const currentPath = location.pathname;
    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({})
    const [isAccountMenuOpen, setIsAccountMenuOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isNoResult, setIsNoResult] = React.useState(false);
    const [isBtnHidden, setIsBtnHidden] = React.useState(false);
    const [isResError, setResError] = React.useState(false);
    const [successUpdate, setSuccessUpdate] = React.useState(false);
    const [isMessage, setMessage] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [sortedMovies, setSortedMovies] = React.useState([]);
    const [userSavedMovies, setUserSavedMovies] = React.useState([]);
    const [shortMovie, setShortMovie] = React.useState(false);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
                auth.getToken(jwt)
                .then((data) => {
                    if (data) {
                        setLoggedIn(true);
                        tokenCheck();
                        setCurrentUser(data);
                        history.push(currentPath);
                        const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'));
                            if (movieSearchResult) {
                                setSortedMovies(movieSearchResult);
                            }
                    }
                })
                .catch((err) => {
                    console.log(`Переданный токен некорректен или просрочек: ${err}`);
                    localStorage.removeItem('jwt');
                    history.push('/');
                });
        }
    }, []);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            moviesApi.getMovies()
                .then((movies) => {
                    localStorage.setItem('movies', movies);
                    setMovies(movies);
                    setIsBtnHidden(true);
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке фильмов: ${err}`)
                });
        }}, []);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi.getSavedMovies()
                .then(() => {
                    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
                    if (savedMovies) {
                        savedMovies.filter((item) => item.owner === currentUser._id);
                        setUserSavedMovies(savedMovies);
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке сохраненных фильмов: ${err}`)
                });
        }}, []);

    React.useEffect(() => {
        mainApi.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
    }, []);

    function handleAccountMenuClick() {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    }

    function closeAccountMenu() {
        setIsAccountMenuOpen(false);
    }


    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        auth.getToken(jwt)
            .then((data) => {
                    if (data) {
                        setCurrentUser(data);
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при проверке токена: ${err}`)
                    localStorage.removeItem('jwt');
                    setResError(true);
                    setMessage(uncorrectTokenText);
                });
        }

    function handleRegister(name, email, password) {
        auth.signUp(name, email, password)
            .then((data) => {
                if (data) {
                    setResError(false);
                    setMessage('');
                    history.push('/signin');
                }
            })
            .catch((err) => {
                console.log(`При регистрации: ${err}`);
                setResError(true);
                if (err === 'Произошла ошибка: 409') {
                    setMessage(conflictErrorText);
                } else if (err === 'Произошла ошибка: 500') {
                    setMessage(serverErrorText);
                } else {
                    setMessage('При регистрации произошла ошибка!')
                }
            })
    }

    function handleLogIn(email, password) {
        auth.signIn(email, password)
            .then((data) => {
                if (data === undefined) {
                    setResError(true);
                    setMessage(unauthorizedErrorText);
                } else if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    tokenCheck();
                    setResError(false);
                    setMessage('');
                    history.push('/movies');
                    setSortedMovies([]);
                    setUserSavedMovies([]);
                }
            })
            .catch((err) => {
                console.log(`При логировании: ${err}`)
                setResError(true);
                 if (err === 'Произошла ошибка: 500') {
                    setMessage(serverErrorText);
                } else if (err === 'Произошла ошибка: 400') {
                    setMessage(badRequestErrorText);
                } else {
                    setMessage('При входе произошла ошибка!')
                }
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('movieSearchResult');
        localStorage.clear();
        setLoggedIn(false);
        history.push('/');
    }

    function handleUpdateProfile(data) {
        mainApi.changeUserInfo(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data});
                setSuccessUpdate(true);
            })
            .catch((err) => {
                console.log(`Ошибка при редактировании профиля: ${err}`)
            });
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
                shortMovie ? movie.duration <= shortMovieDuration : true
            )
        }
    }

    function searchMovies(keyword) {
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
                localStorage.setItem('movieSearchResult', JSON.stringify(result));
                setSortedMovies(result);
            } else if (result.length < 1) {
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
                setUserSavedMovies(result);
            } else if (result.length < 1) {
                setIsNoResult(true);
                setUserSavedMovies([]);
            }
        })
    }

    function saveMovie(movie) {
        mainApi.saveMovie(movie)
            .then((newSavedMovie) => {
                localStorage.setItem('savedMovies', JSON.stringify((newSavedMovie = [newSavedMovie, ...userSavedMovies])));
                setUserSavedMovies(newSavedMovie);
            })
            .catch((err) => {
                console.log(`Ошибка при сохранении фильма: ${err}`)
            });
    }

    function deleteMovie(movie) {
        const movieId = movie.id || movie.movieId;
        const selectedMovie = userSavedMovies.find((item) => item.movieId === movieId);
        mainApi.deleteMovie({_id: selectedMovie._id})
            .then((deletedMovie) => {
                if (!deletedMovie) {
                    throw new Error('При удалении фильма произошла ошибка');
                } else {
                    const newMoviesList = userSavedMovies.filter((c) => c.movieId !== movieId);
                    setUserSavedMovies(newMoviesList);
                }
            })
            .catch((err) => {
                console.log(`При удалении фильма: ${err}`)
            });
    }

    function movieWasSaved(movie) {
        return (movie.isSaved = userSavedMovies.some(
            (savedMovie) => savedMovie.movieId === movie.id
        ));
    }

    React.useEffect(() => {
        movieWasSaved(sortedMovies);
    }, [userSavedMovies]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                {currentPath === "/" && !loggedIn && <Header
                    onMenuClick={handleAccountMenuClick}
                    loggedIn={loggedIn}/>}
                {loggedIn && <Header
                    onMenuClick={handleAccountMenuClick}
                    loggedIn={loggedIn}/>}
                <Switch>
                    <Route path="/signup">
                        <Register
                            onRegister={handleRegister}
                            isResError={isResError}
                            isMessage={isMessage}/>
                    </Route>
                    <Route path="/signin">
                        <Login
                            onLogin={handleLogIn}
                            isResError={isResError}
                            isMessage={isMessage}/>
                    </Route>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        component={Movies}
                        movies={filterShortMovies(sortedMovies)}
                        onSearch={searchMovies}
                        onFilter={handleCheckBox}
                        isShortMovie={shortMovie}
                        onSave={saveMovie}
                        onDelete={deleteMovie}
                        isNoResult={isNoResult}
                        isBtnHidden={isBtnHidden}
                        movieWasSaved={movieWasSaved}
                    />
                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                        onSearch={searchSavedMovies}
                        isNoResult={isNoResult}
                        isLoading={isLoading}
                        movies={filterShortMovies(userSavedMovies)}
                        onFilter={handleCheckBox}
                        isShortMovie={shortMovie}
                        onDelete={deleteMovie}
                        isSavedMovies={true}
                    />
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        successUpdate={successUpdate}
                        onSignOut={signOut}
                        onEditProfile={handleUpdateProfile}/>
                    <Route path="/*">
                        <NotFoundWindow/>
                    </Route>
                </Switch>
                {loggedIn && <Footer/>}
                <AccountMenu
                    isOpen={isAccountMenuOpen}
                    onClose={closeAccountMenu}/>}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
