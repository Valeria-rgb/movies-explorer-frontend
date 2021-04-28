import React from "react";
import {Link} from "react-router-dom";
import '../Register/Register.css'
import icon from "../../images/student__icon.svg";

function Register() {
    return(
        <section className='register'>
            <div className='auth__container'>
                <img className='auth__student-icon' src={icon} alt='Иконка студента'/>
                <h1 className='auth__greeting'>Добро пожаловать!</h1>
                <form className='auth__form'>
                    <p className='auth__title'>Имя</p>
                    <input className='auth__input' type='text'/>
                    <p className='auth__title' >E-mail</p>
                    <input className='auth__input' type='email'/>
                    <p className='auth__title'>Пароль</p>
                    <input className='auth__input auth__input_error' type='password'/>
                    <span className='auth__error'>Что-то пошло не так...</span>
                    <button className='auth__submit-button' type='submit'>Зарегистрироваться</button>
                    <div className='auth__link-container'>
                        <p className='auth__link-text auth__link-question'>Уже зарегистрированы?</p>
                        <Link to='/signin' className='auth__link-text auth__link'>Войти</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default Register;
