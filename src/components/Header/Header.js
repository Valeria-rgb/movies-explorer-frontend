import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import '../Header/Header.css'
import icon from "../../images/student__icon.svg";
import account from "../../images/header__account.svg";

function Header({ onMenuClick }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
            <header className={currentPath === '/' ? 'header header_pink' : 'header'}>
                <div className={currentPath === '/' ? 'header__container' : 'header__container header__container_wide'}>
                    <img className='header__student-icon' src={icon} alt='Иконка студента'/>
                    <button className={currentPath === '/' ? 'header__menu_invisible' : 'header__menu'} onClick={onMenuClick}/>
                    <nav className={currentPath === '/' ? 'header__navigation_invisible' : 'header__navigation header__navigation_films'}>
                        <NavLink to='/movies' className={currentPath === '/movies' ? 'header__link_active' : 'header__link'}>Фильмы</NavLink>
                        <NavLink to='/saved-movies' className={currentPath === '/saved-movies' ? 'header__link_active' : 'header__link'}>Сохраненные фильмы</NavLink>
                    </nav>
                    <nav className={currentPath === '/' ? 'header__navigation_invisible' : 'header__navigation header__navigation_account'}>
                        <NavLink to='/profile' className={currentPath === '/profile' ? 'header__link_active' : 'header__link'}>
                            Аккаунт</NavLink>
                        <div className='header__account-box'>
                            <img className='header__account-icon' src={account} alt='Иконка аккаунта'/>
                        </div>
                    </nav>
                    <nav className={currentPath === '/' ? 'header__navigation' : 'header__navigation_invisible'}>
                        <NavLink to='/signup' className='header__link'>Регистрация</NavLink>
                        <NavLink to='/signin'>
                            <button className='header__button' type='button'>Войти</button>
                        </NavLink>
                    </nav>
                </div>
            </header>
    );
}
export default Header;


