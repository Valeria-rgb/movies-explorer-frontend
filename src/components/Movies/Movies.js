import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieNotFoundMessage from '../MovieNotFoundMessage/MovieNotFoundMessage';

function Movies({ movies, onSearch, isLoading, isNoResult, isBtnHidden}) {
    return(
        <main className="movies">
            <SearchForm onSearch={onSearch}/>
            {isLoading && <Preloader/>}
            {isNoResult && !isLoading && <MovieNotFoundMessage/>}
            <MoviesCardList
            movies={movies}
            isBtnHidden={isBtnHidden}/>
        </main>
    );
}
export default Movies;
