import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import React from "react";

function SavedMovies({movies, onDelete, onSearch, isNoResult, isLoading, onFilter, isShortMovie, movieWasSaved }) {
    return(
        <section className="movies">
            <SearchForm onSearch={onSearch}
                        isNoResult={isNoResult}
                        isLoading={isLoading}
                        isShortMovie={isShortMovie}
                        onFilter={onFilter}/>
            {isLoading && <Preloader/>}
            <MoviesCardList
                movies={movies}
                onDelete={onDelete}
                movieWasSaved={movieWasSaved}
            />
        </section>
    );
}
export default SavedMovies;
