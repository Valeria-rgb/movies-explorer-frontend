import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ movies, onSearch, onSave, isLoading, isNoResult, isBtnHidden, isSaved}) {
    return(
        <main className="movies">
            <SearchForm onSearch={onSearch}
            isNoResult={isNoResult}
            isLoading={isLoading}/>
            {isLoading && <Preloader/>}
            <MoviesCardList
            movies={movies}
            onSave={onSave}
            isBtnHidden={isBtnHidden}
            isSaved={isSaved}/>
        </main>
    );
}
export default Movies;
