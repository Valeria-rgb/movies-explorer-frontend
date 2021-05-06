import React from 'react';
import './SearchForm.css';
import line from "../../images/portfolio__line.svg";
import icon from "../../images/search__icon.svg";

function SearchForm({ onSearch }) {
    const [movieName, setMovieName] = React.useState([]);

    function handleSearchableMovieChange(e) {
        setMovieName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(movieName);
    }

    return(
        <section className='search-form'>
            <form
                onSubmit={handleSubmit}
                className='search-form__search-film'>
                <div className='search-form__container'>
                    <img className='search-form__icon' src={icon} alt='Иконка лупы'/>
                    <input
                        onChange={handleSearchableMovieChange}
                        className='search-form__input' name='film-name' placeholder='Фильм' type='text' required/>
                    <button className='search-form__button' type='submit'>Найти</button>
                </div>
                <img className='search-form__line' src={line} alt='Декоративная линия'/>
                <div className='search-form__short-film-container'>
                    <input className='search-form__checkbox' type='checkbox'/>
                    <p className='search-form__checkbox-name'>Короткометражки</p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;
