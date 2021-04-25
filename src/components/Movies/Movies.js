import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function Movies() {
    return(
        <main className="movies">
            <SearchForm/>
            <Preloader/>
            {/*<MoviesCardList/>*/}
            {/*<MoviesCard/>*/}
        </main>
    )
}
export default Movies;
