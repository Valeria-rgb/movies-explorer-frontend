import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import './AccountMenu.css';
import '../Header/Header.css';
import account from "../../images/header__account.svg";

function AccountMenu({ isOpen, onClose }) {
    const location = useLocation();
    const currentPath = location.pathname;
    return(
        <section className={`account-menu ${isOpen ? 'account-menu_opened' : ''}`}>
            <div className='account-menu__container'>
                <button className='account-menu__close-button' onClick={onClose}/>
                <NavLink to='/' className='account-menu__link' onClick={onClose}>
                    Главная</NavLink>
                <NavLink to='/movies' className={currentPath === '/movies' ? 'account-menu__link account-menu__link_active' : 'account-menu__link'} onClick={onClose}>
                    Фильмы</NavLink>
                <NavLink to='/saved-movies' className={currentPath === '/saved-movies' ? 'account-menu__link account-menu__link_active' : 'account-menu__link'} onClick={onClose}>
                    Сохраненные фильмы</NavLink>
                <div className='header__navigation account-menu__navigation'>
                    <NavLink to='/profile' className='header__link header__link_account'>
                        Аккаунт</NavLink>
                    <div className='account-menu__account-box'>
                        <img className='header__account-icon' src={account} alt='Иконка аккаунта'/>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AccountMenu;
