import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import icon from "../../images/save__icon.svg";
import image from "../../images/card__image.png";

import delete_icon from "../../images/delete__icon.svg";
import { baseImageURL } from '../../utils/constants';

function MoviesCard({movie, onSave, onDelete, movieWasSaved, isSavedMovies}) {
    const location = useLocation();
    const currentPath = location.pathname;
    const isBtnSave = !isSavedMovies && movieWasSaved(movie);

    function getImage() {
        if (movie.image === null) {
            return image
        } else {
            return baseImageURL + movie.image.url;
        }
    }

    function saveMovie() {
        onSave({
            country: movie.country ? movie.country : 'пустое поле',
            director:movie.director,
            duration: movie.duration,
            year: movie.year,
            description:movie.description,
            image: movie.image ? baseImageURL + movie.image.url : image,
            trailer: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN ? movie.nameEN : 'пустое поле',
            thumbnail: movie.image && movie.image.formats.thumbnail ? baseImageURL + movie.image.formats.thumbnail.url : image,
            id: movie.id,
            isSaved: movie.isSaved
        })
    }

    function deleteMovie() {
        onDelete(movie)
    }

    return(
        <li className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__name'>{movie.nameRU}</h2>
                <p className='movies-card__timing'>{movie.duration} мин</p>
            </div>
            <div className='movies-card__container'>
                <a href={movie.trailer || movie.trailerLink} target='_blank' rel='noreferrer'>
                    { currentPath === "/movies" && (<img className='movies-card__image' src={getImage()}  alt={movie.nameRU}/>)}
                    { currentPath === "/saved-movies" && (<img className='movies-card__image' src={ movie.image}  alt={movie.nameRU}/>)}
                </a>
            </div>
            {currentPath === "/movies" && !isBtnSave && (
                <button className='movies-card__save-button movies-card__save-button_to-save' onClick={saveMovie}>Сохранить
                </button>)}
            {currentPath === "/movies" && isBtnSave && (
                <button className='movies-card__save-button movies-card__save-button_saved' onClick={deleteMovie}>
                <img className='movies-card__save-icon' src={icon} alt='Иконка сохранения'/>
                </button>)}
            {currentPath === "/saved-movies" && (
                <button className='movies-card__save-button movies-card__save-button_delete' onClick={deleteMovie}>
                <img className='movies-card__delete-icon' src={delete_icon} alt='Иконка удаления'/>
                </button>)}
        </li>
    );
}
export default MoviesCard;
