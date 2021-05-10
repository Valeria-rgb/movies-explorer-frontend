import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({movies}) {
    const location = useLocation();
    const currentPath = location.pathname;
    const [amount, setAmount] = React.useState(12);
    const [loadMore,setLoadMore] = React.useState(3);

    function getWidth() {
        const { innerWidth: width } = window;
        return width;
    };

    React.useEffect(() => {
        if (getWidth() > 1200) {
            setAmount(12);
            setLoadMore(3);
        } else if (getWidth() <= 1200 && getWidth() > 480) {
            setAmount(8);
            setLoadMore(2);
        } else if (getWidth() <= 480 && getWidth() > 320) {
            setAmount(5);
            setLoadMore(2);
        }
    }, []);


    function loadMoreBtn() {
        return setAmount(amount + loadMore);
    };


    return(
        <section className='movies-card-list'>
            <ul className='movies-card-list__elements'>
                {movies.slice(0, amount).map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.id}
                    />
                ))}
            </ul>
            {currentPath === "/movies" && (
            <button className='movies-card-list__load-button' onClick={loadMoreBtn}>Ещё</button>)}
            {currentPath === "/saved-movies" && (
            <div className='movies-card-list__saved-devider'/>)}
        </section>
    );
}

export default MoviesCardList;
