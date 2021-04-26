import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return(
        <section className='movies-card-list'>
            <ul className='movies-card-list__elements'>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </ul>
            <button className='movies-card-list__load-button'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;
