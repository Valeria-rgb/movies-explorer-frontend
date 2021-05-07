import './AboutMe.css';
import line from "../../images/landing__line.svg";
import photo from "../../images/about-me__photo.svg";

function AboutMe() {
    return(
        <section className='about-me'>
            <h4 className='about-me__header'>Студент</h4>
            <img className='about-me__line' src={line} alt='Декоративная линия'/>
            <div className='about-me__info'>
                <img className='about-me__photo' src={photo} alt='Фото'/>
                <h2 className='about-me__name'>Виталий</h2>
                <p className='about-me__job'>Фронтенд-разработчик, 30 лет</p>
                <p className='about-me__description'>
                     Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </p>
                <div className='about-me__links'>
                    <a className='about-me__link' href='https://www.facebook.com' rel='noreferrer' target='_blank'>Facebook</a>
                    <a className='about-me__link' href='https://github.com/Valeria-rgb' rel='noreferrer' target='_blank'>Github</a>
                </div>
            </div>
        </section>
    );
}
export default AboutMe;
