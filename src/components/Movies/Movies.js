import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function Movies({ movies, onSearch, onSave, onDelete, isLoading, isNoResult, isBtnHidden, isSaved, onFilter, isShortMovie }) {

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
            oDelete={onDelete}
            isBtnHidden={isBtnHidden}
            isSaved={isSaved}/>
        </main>
    );
}
export default Movies;
