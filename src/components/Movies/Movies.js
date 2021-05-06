import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies }) {
    return(
        <main className="movies">
            <SearchForm/>
            <Preloader/>
            <MoviesCardList
            movies={ movies }/>
        </main>
    );
}
export default Movies;
