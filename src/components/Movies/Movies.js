import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, onSearch, isLoading}) {
    return(
        <main className="movies">
            <SearchForm onSearch={onSearch}/>
            {isLoading && <Preloader/>}
            <MoviesCardList
            movies={movies}
            isLoading={isLoading}/>
        </main>
    );
}
export default Movies;
