import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <section className='movies-card-list'>
            <ul className='movies-card-list__elements'>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </ul>
            {currentPath === "/movies" && (
            <button className='movies-card-list__load-button'>Ещё</button>)}
            {currentPath === "/saved-movies" && (
            <div className='movies-card-list__saved-devider'/>)}
        </section>
    );
}

export default MoviesCardList;
