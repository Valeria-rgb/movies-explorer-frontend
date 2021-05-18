import React from 'react';
import './SearchForm.css';
import line from "../../images/portfolio__line.svg";
import icon from "../../images/search__icon.svg";

function SearchForm({ onSearch, isNoResult, isLoading, onFilter, isShortMovie }) {
    const [movieName, setMovieName] = React.useState([]);
    const [isError, setIsError] = React.useState(false);

    function handleSearchableMovieChange(e) {
        setMovieName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if ((movieName.length > 0)) {
            setIsError(false);
            onSearch(movieName);
        } else {
        setIsError(true);
        }
    }

    return(
        <section className='search-form'>
            <form
                onSubmit={handleSubmit}
                className='search-form__search-film' noValidate>
                <div className='search-form__container'>
                    <img className='search-form__icon' src={icon} alt='Иконка лупы'/>
                    <input
                        onChange={handleSearchableMovieChange}
                        className='search-form__input' name='film-name' placeholder='Фильм' type='text'/>
                    <button className='search-form__button' type='submit'>Найти</button>
                </div>
                <img className='search-form__line' src={line} alt='Декоративная линия'/>
                <div className='search-form__short-film-container'>
                    <input className='search-form__checkbox' type='checkbox' onChange={onFilter} checked={isShortMovie}/>
                    <p className='search-form__checkbox-name'>Короткометражки</p>
                </div>
                {isError && <span className='search-form__message'>Нужно ввести ключевое слово &#128521;</span>}
                {isNoResult && !isLoading && !isError && <span className='search-form__message'>Ничего не найдено &#128543;</span>}
            </form>
        </section>
    );
}

export default SearchForm;
