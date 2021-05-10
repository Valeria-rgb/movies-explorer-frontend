import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieNotFoundMessage from '../MovieNotFoundMessage/MovieNotFoundMessage';

function Movies({ movies, onSearch, isLoading, isNoResult}) {
    return(
        <main className="movies">
            <SearchForm onSearch={onSearch}/>
            {isLoading && <Preloader/>}
            {isNoResult && !isLoading && <MovieNotFoundMessage/>}
            <MoviesCardList
            movies={movies}
            isLoading={isLoading}
            isNoResult={isNoResult}/>
        </main>
    );
}
export default Movies;
