import React from "react";
import {Link} from "react-router-dom";
import '../Profile/Profile.css';

function Profile({ onEditProfile }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
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
            setEmailError('Почта обязательна для заполнения');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onEditProfile(name, email);
    }

    React.useEffect(() => {
        if (
            name && email &&
            !nameError && !emailError
        ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [name, email, nameError, emailError]);

    return(
        <section className='profile'>
            <h1 className='profile__greeting'>Привет, Виталий!</h1>
            <form className='profile__form'
                  onSubmit={handleSubmit}>
                <div className='profile__container'>
                    <p className='profile__title'>Имя</p>
                    <input className={`profile__input ${nameError ? 'profile__input_error' : ''}`}
                           type='text'
                           name='name'
                           value={name}
                           onChange={handleChangeName}/>
                </div>
                <span className='auth__error profile__error'>{nameError}</span>
                <div className='profile__container'>
                    <p className='profile__title'>E-mail</p>
                    <input className={`profile__input ${emailError ? 'profile__input_error' : ''}`}
                           type='email'
                           name='email'
                           value={email}
                           onChange={handleChangeEmail}/>
                </div>
                <span className='auth__error profile__error'>{emailError}</span>
                <button className='profile__button' type='submit'>Редактировать</button>
                <Link to='/signin' className='profile__link'>Выйти из аккаунта</Link>
            </form>
        </section>
    );
}

export default Profile;
