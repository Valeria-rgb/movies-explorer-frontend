import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";

function SavedMovies({movies, onDelete, onSearch, isNoResult, isLoading }) {
    return(
        <section className="movies">
            <SearchForm onSearch={onSearch}
                        isNoResult={isNoResult}
                        isLoading={isLoading}/>
            {isLoading && <Preloader/>}
            <MoviesCardList
                movies={movies}
                onDelete={onDelete}
            />
        </section>
    );
}
export default SavedMovies;
