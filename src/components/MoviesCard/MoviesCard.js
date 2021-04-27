import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import icon from "../../images/save__icon.svg";
import image from "../../images/card__image.svg";
import delete_icon from "../../images/delete__icon.svg";

function MoviesCard() {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <li className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__name'>В погоне за Бенкси</h2>
                <p className='movies-card__timing'>27 минут</p>
            </div>
            <img className='movies-card__image'src={image} alt='Кадр фильма'/>
            {currentPath === "/movies" && (
                <button className='movies-card__save-button movies-card__save-button_to-save'>Сохранить
                </button>)}
            {/*кнопка для сохраненного состояния фильма*/}
            {/*{currentPath === "/movies" && (*/}
            {/*<button className='movies-card__save-button movies-card__save-button_saved'>*/}
            {/*    <img className='movies-card__save-icon' src={icon} alt='Иконка сохранения'/>*/}
            {/*</button>)}*/}
            {currentPath === "/saved-movies" && (
                <button className='movies-card__save-button movies-card__save-button_delete'>
                <img className='movies-card__delete-icon' src={delete_icon} alt='Иконка удаления'/>
            </button>)}
        </li>
    );
}
export default MoviesCard;
