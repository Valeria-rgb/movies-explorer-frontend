import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, onSearch }) {
    return(
        <main className="movies">
            <SearchForm onSearch={onSearch}/>
            <Preloader/>
            <MoviesCardList
            movies={movies}/>
        </main>
    );
}
export default Movies;
