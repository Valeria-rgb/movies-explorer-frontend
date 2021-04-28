import React from "react";
import {Link} from "react-router-dom";
import '../Register/Register.css'
import '../Login/Login.css'
import icon from "../../images/student__icon.svg";

function Login() {
    return(
        <section className='login'>
            <div className='auth__container'>
                <img className='auth__student-icon' src={icon} alt='Иконка студента'/>
                <h1 className='auth__greeting'>Рады видеть!</h1>
                <form className='auth__form'>
                    <p className='auth__title' >E-mail</p>
                    <input className='auth__input' type='email'/>
                    <p className='auth__title'>Пароль</p>
                    <input className='auth__input' type='password'/>
                    <button className='auth__submit-button auth__submit-button_login' type='submit'>Войти</button>
                    <div className='auth__link-container auth__link-container_login'>
                        <p className='auth__link-text auth__link-question'>Ещё не зарегистрированы?</p>
                        <Link to='/signup' className='auth__link-text auth__link'>Регистрация</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default Login;

