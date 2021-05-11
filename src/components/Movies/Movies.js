import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ movies, onSearch, isLoading, isNoResult, isBtnHidden}) {
    return(
        <main className="movies">
            <SearchForm onSearch={onSearch}
            isNoResult={isNoResult}
            isLoading={isLoading}/>
            {isLoading && <Preloader/>}
            <MoviesCardList
            movies={movies}
            isBtnHidden={isBtnHidden}/>
        </main>
    );
}
export default Movies;
