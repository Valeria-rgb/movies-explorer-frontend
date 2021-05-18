import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {
    moreMoviesToLoadWide, moreMoviesToLoadMedium,
    moviesAmountS, moviesAmountM,
    moviesAmountL, desktopWidth,
    mobileWidth, oldSchoolMobileWidth,
} from '../../utils/constants'

function MoviesCardList({movies, isBtnHidden, onSave, onDelete, movieWasSaved, isSavedMovies}) {
    const location = useLocation();
    const currentPath = location.pathname;
    const [amount, setAmount] = React.useState(12);
    const [loadMore,setLoadMore] = React.useState(3);
    const [size, setSize] = React.useState([0, 0]);

    function getWidth() {
        const { innerWidth: width } = window;
        return width;
    }

    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    React.useEffect(() => {
        if (getWidth() > desktopWidth) {
            setAmount(moviesAmountL);
            setLoadMore(moreMoviesToLoadWide);
        } else if (getWidth() <= desktopWidth && getWidth() > mobileWidth) {
            setAmount(moviesAmountM);
            setLoadMore(moreMoviesToLoadMedium);
        } else if (getWidth() <= mobileWidth && getWidth() > oldSchoolMobileWidth) {
            setAmount(moviesAmountS);
            setLoadMore(moreMoviesToLoadMedium);
        }
    }, [size]);

    function loadMoreBtn() {
        return setAmount(amount + loadMore);
    }

    return(
        <section className='movies-card-list'>
            {currentPath === "/saved-movies" && <ul className='movies-card-list__elements'>
                {movies.slice(0, amount)
                    .map((movie,id) => (
                        <MoviesCard
                        key={movie.movieId}
                        id={id}
                        movie={movie}
                        name={movie.nameRU}
                        duration={movie.duration}
                        onSave={onSave}
                        onDelete={onDelete}
                        isSavedMovies={isSavedMovies}/>
                ))}
            </ul>}
            {currentPath === "/movies" && <ul className='movies-card-list__elements'>
                {movies.slice(0, amount)
                    .map((movie,id) => (
                        <MoviesCard
                        key={movie.id}
                        id={id}
                        movie={movie}
                        name={movie.nameRU}
                        duration={movie.duration}
                        onSave={onSave}
                        onDelete={onDelete}
                        movieWasSaved={movieWasSaved}/>
                ))}
            </ul>}
            {currentPath === "/movies" && !isBtnHidden && (movies.length - amount >= 2) &&
            (<button className='movies-card-list__load-button' onClick={loadMoreBtn}>Ещё</button>)}
            {currentPath === "/saved-movies" && (
            <div className='movies-card-list__saved-devider'/>)}
        </section>
    );
}

export default MoviesCardList;
