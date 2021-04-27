import '../Profile/Profile.css';

function Profile() {
    return(
        <section className='profile'>
            <h1 className='profile__greeting'>Привет, Виталий!</h1>
            <form className='profile__form'>
                <div className='profile__container'>
                    <p className='profile__title'>Имя</p>
                    <input className='profile__input'/>
                </div>
                <div className='profile__container'>
                    <p className='profile__title'>E-mail</p>
                    <input className='profile__input'/>
                </div>
                <p className='profile__button'>Редактировать</p>
                <p className='profile__button'>Выйти из аккаунта</p>
            </form>
        </section>
    );
}

export default Profile;
