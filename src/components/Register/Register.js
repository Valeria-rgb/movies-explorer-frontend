import React from "react";
import {Link} from "react-router-dom";
import '../Register/Register.css'
import icon from "../../images/student__icon.svg";

function Register( { onRegister }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [formValid, setFormValid] = React.useState(false);

    function handleChangeName(e) {
        const validName =/^[а-яА-ЯёЁa-zA-Z- ]+$/.test(e.target.value);

        if (e.target.value.length < 2) {
            setNameError('Введите не менее 2 символов');
        } else if (e.target.value.length > 30) {
            setNameError('Введите не более 30 символов');
        } else if (!validName) {
            setNameError('Имя может содержать только латиницу, кириллицу, пробел или дефис');
        } else {
            setNameError('');
        }
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(e.target.value);

        if (!validEmail) {
            setEmailError('Введите верный адрес почты');
        } else if (e.target.value.length < 1) {
            setNameError('Почта обязательна для заполнения');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        if (e.target.value.length < 6) {
            setPasswordError('Введите не менее 5 символов');
        } else if (e.target.value.length < 1) {
            setNameError('Пароль обязателен для заполнения');
        } else {
            setPasswordError('');
        }
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(name, email, password);
    }

    React.useEffect(() => {
        if (
            name && email && password &&
            !nameError && !emailError && !passwordError
        ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [name, email, password, nameError, emailError, passwordError]);

    return(
        <section className='register'>
            <div className='auth__container'>
                <img className='auth__student-icon' src={icon} alt='Иконка студента'/>
                <h1 className='auth__greeting'>Добро пожаловать!</h1>
                <form className='auth__form'
                      onSubmit={handleSubmit}>
                    <p className='auth__title'>Имя</p>
                    <input className={`auth__input ${nameError ? 'auth__input_error' : ''}`}
                           type='text'
                           name='name'
                           value={name}
                           onChange={handleChangeName}
                           required/>
                    <span className='auth__error'>{nameError}</span>
                    <p className='auth__title' >E-mail</p>
                    <input className={`auth__input ${emailError ? 'auth__input_error' : ''}`}
                           type='email'
                           name='email'
                           value={email}
                           onChange={handleChangeEmail}
                           required/>
                    <span className='auth__error'>{emailError}</span>
                    <p className='auth__title'>Пароль</p>
                    <input className={`auth__input ${passwordError ? 'auth__input_error' : ''}`}
                           type='password'
                           name='password'
                           value={password}
                           onChange={handleChangePassword}
                           required/>
                    <span className='auth__error'>{passwordError}</span>
                    <button className={`auth__submit-button ${
                        !formValid ? 'auth__submit-button_disabled' : ''}`}
                            type='submit'
                            disabled={!formValid}>
                        Зарегистрироваться</button>
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
