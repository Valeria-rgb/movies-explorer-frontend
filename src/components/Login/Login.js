import React from "react";
import { Link } from "react-router-dom";
import '../Register/Register.css'
import '../Login/Login.css'

import icon from "../../images/student__icon.svg";

function Login({ onLogin}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [formValid, setFormValid] = React.useState(false);

    function handleChangeEmail(e) {
        const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(e.target.value);

        if (!validEmail) {
            setEmailError('Введите верный адрес почты');
        } else if (e.target.value.length < 1) {
            setEmailError('Почта обязательна для заполнения');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        if (e.target.value.length < 6) {
            setPasswordError('Введите не менее 5 символов');
        } else if (e.target.value.length < 1) {
            setPasswordError('Пароль обязателен для заполнения');
        } else {
            setPasswordError('');
        }
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    React.useEffect(() => {
        if (
            email && password &&
            !emailError && !passwordError
        ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [email, password, emailError, passwordError]);

    return(
        <section className='login'>
            <div className='auth__container'>
                <img className='auth__student-icon' src={icon} alt='Иконка студента'/>
                <h1 className='auth__greeting'>Рады видеть!</h1>
                <form className='auth__form'
                onSubmit={onLogin}
                >
                    <p className='auth__title' >E-mail</p>
                    <input className={`auth__input ${emailError ? 'auth__input_error' : ''}`}
                           type='email'
                           name='email'
                           value={email}
                           onChange={handleChangeEmail}/>
                    <span className='auth__error'>{emailError}</span>
                    <p className='auth__title'>Пароль</p>
                    <input className={`auth__input ${passwordError ? 'auth__input_error' : ''}`}
                           type='password'
                           name='password'
                           value={password}
                           onChange={handleChangePassword}/>
                    <span className='auth__error'>{passwordError}</span>
                    <button className={`auth__submit-button ${
                        !formValid ? 'auth__submit-button_disabled' : ''}`}
                            type='submit'
                            disabled={!formValid}>Войти</button>
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

