import {Link} from "react-router-dom";
import '../Profile/Profile.css';

function Profile() {
    return(
        <section className='profile'>
            <h1 className='profile__greeting'>Привет, Виталий!</h1>
            <form className='profile__form'>
                <div className='profile__container'>
                    <p className='profile__title'>Имя</p>
                    <input className='profile__input' type='text'/>
                </div>
                <div className='profile__container'>
                    <p className='profile__title'>E-mail</p>
                    <input className='profile__input' type='email'/>
                </div>
                <p className='profile__button'>Редактировать</p>
                <Link to='/signin' className='profile__link'>Выйти из аккаунта</Link>
            </form>
        </section>
    );
}

export default Profile;
