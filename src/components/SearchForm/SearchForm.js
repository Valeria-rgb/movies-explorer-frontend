import './SearchForm.css';
import line from "../../images/portfolio__line.svg";
import icon from "../../images/search__icon.svg";

function SearchForm() {
    return(
        <section className='search-form'>
            <form className='search-form__search-film'>
                <div className='search-form__container'>
                    <img className='search-form__icon' src={icon} alt='Иконка лупы'/>
                    <input className='search-form__input' name='film-name' placeholder='Фильм' type='text'/>
                    <button className='search-form__button'>Найти</button>
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
