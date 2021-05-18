import React from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import '../Profile/Profile.css';

function Profile({ onEditProfile, onSignOut, successUpdate }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [formValid, setFormValid] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);

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
        onEditProfile({name,email});
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
            <h1 className='profile__greeting'>Привет, {currentUser.name}!</h1>
            <form className='profile__form'
                  onSubmit={handleSubmit}>
                <div className='profile__container'>
                    <p className='profile__title'>Имя</p>
                    <input className={`profile__input ${nameError ? 'profile__input_error' : ''}`}
                           type='text'
                           name='name'
                           value={name}
                           placeholder={currentUser.name}
                           onChange={handleChangeName}/>
                </div>
                <span className='auth__error profile__error'>{nameError}</span>
                <div className='profile__container'>
                    <p className='profile__title'>E-mail</p>
                    <input className={`profile__input ${emailError ? 'profile__input_error' : ''}`}
                           type='email'
                           name='email'
                           placeholder={currentUser.email}
                           value={email}
                           onChange={handleChangeEmail} required/>
                </div>
                <span className='auth__error profile__error'>{emailError}</span>
                {successUpdate && <span className='profile__success-edit'>Профиль успешно изменён &#128521;</span>}
                <button className={`profile__button ${
                    !formValid ? 'profile__button_disabled' : ''}`}
                        type='submit'
                        disabled={!formValid}>Редактировать</button>
                <button className='profile__link' onClick={onSignOut}>Выйти из аккаунта</button>
            </form>
        </section>
    );
}

export default Profile;
