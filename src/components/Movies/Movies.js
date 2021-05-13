import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, onSearch, onSave, onDelete, isLoading, isNoResult, isBtnHidden, movieWasSaved, onFilter, isShortMovie }) {

    return(
        <main className="movies">
            <SearchForm
                onSearch={onSearch}
                isShortMovie={isShortMovie}
                onFilter={onFilter}
                isNoResult={isNoResult}
                isLoading={isLoading}
            />
            {isLoading && <Preloader/>}
            <MoviesCardList
            movies={movies}
            onSave={onSave}
            onDelete={onDelete}
            isBtnHidden={isBtnHidden}
            movieWasSaved={movieWasSaved}/>
        </main>
    );
}
export default Movies;
